import { DriverQualiResult } from '@/types/scraped.type';
import {
    findCorrectResults,
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
export async function getPracticeResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir'
): Promise<DriverQualiResult[]> {
    try {
        // Finding URL with results
        const resultsURL = await findResultsURL(year, raceId);

        const resultsPageHTML = await axios(resultsURL);
        const resultsIndex: number[] = findCorrectResults(resultsPageHTML.data, ['FREE PRACTICE']);

        const dateStrings: string[] = getDateResults(resultsPageHTML.data);

        return getQualiPracticeResult(
            resultsPageHTML.data,
            resultsIndex[0],
            ['laps', 'time', 'gap', 'int', 'kph', 'lap_set_on'],
            dateStrings
        );
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
