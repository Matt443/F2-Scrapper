import { DriverQualiResult, ResultsTypes } from '@/types/scraped.type';
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
export async function getPracticeResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
): Promise<DriverQualiResult[]> {
    try {
        // Finding URL with results
        const resultsURL = await findResultsURL(year, raceId, f3Results);

        const resultsPageHTML = await axios(resultsURL);
        const requestedResultTypes: ResultsTypes[] = ['FREE PRACTICE', 'PRACTICE'];
        const [resultIndexes, _foundedIndexes] = filterResults(
            resultsPageHTML.data,
            requestedResultTypes
        );

        const dateStrings: string[] = getDateResults(resultsPageHTML.data);
        return getQualiPracticeResult(
            resultsPageHTML.data,
            resultIndexes[0],
            ['laps', 'time', 'gap', 'int', 'kph', 'lap_set_on'],
            dateStrings
        );
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
