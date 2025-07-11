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
 * @param {boolean} [f3Results=false]
 * @returns {Promise<DriverRaceResult[]>}
 */
export async function getQualiResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
): Promise<DriverQualiResults[]> {
    try {
        // Finding URL with results

        const resultsURL = await findResultsURL(year, raceId, f3Results);

        //Defining requested result types
        const resultsPageHTML = await axios(resultsURL);
        const requestedResultTypes: ResultsTypes[] = [
            'QUALIFYING SESSION',
            'QUALIFYING GROUP A',
            'QUALIFYING GROUP B',
            'QUALIFYING'
        ];

        const dateStrings: string[] = getDateResults(resultsPageHTML.data);

        //Filtering result types
        const [resultIndexes, foundedIndexes] = filterResults(
            resultsPageHTML.data,
            requestedResultTypes
        );

        //Getting all founded results
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
