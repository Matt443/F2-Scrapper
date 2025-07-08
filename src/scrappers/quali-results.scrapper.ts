import { DriverQualiResults, ResultsTypes } from '@/types/scraped.type';
import {
    filterResults,
    findResultsURL,
    getDateResults,
    getQualiPracticeResult
} from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {string | number} raceId
 * @returns {Promise<DriverRaceResult[]>}
 */
export async function getQualiResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir'
): Promise<DriverQualiResults[]> {
    try {
        const resultsURL = await findResultsURL(year, raceId);

        const resultsPageHTML = await axios(resultsURL);
        const requestedResultTypes: ResultsTypes[] = [
            'QUALIFYING SESSION',
            'QUALIFYING GROUP A',
            'QUALIFYING GROUP B'
        ];

        const dateStrings: string[] = getDateResults(resultsPageHTML.data);

        const [resultIndexes, foundedIndexes] = filterResults(
            resultsPageHTML.data,
            requestedResultTypes
        );

        const resultsAllQuali = resultIndexes.map((index: number, i: number) => {
            return {
                qualiType: requestedResultTypes[foundedIndexes[i]],
                results: getQualiPracticeResult(
                    resultsPageHTML.data,
                    index,
                    ['laps', 'time', 'gap', 'int', 'kph', 'lap_set_on'],
                    dateStrings
                )
            };
        });
        return resultsAllQuali;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
