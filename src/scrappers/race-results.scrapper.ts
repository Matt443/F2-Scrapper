import { DriverRaceResult } from '@/types/scraped.type';
import { findCorrectResults, findResultsURL, getAnyResults } from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {string | number} raceId
 * @param {boolean} [f3Results=false]
 * @returns {Promise<DriverRaceResult[]>}
 */
export async function getRaceResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
): Promise<DriverRaceResult[]> {
    try {
        // Finding URL with results
        const resultsURL = await findResultsURL(year, raceId, f3Results);

        const resultsPageHTML = await axios(resultsURL);
        const resultsIndex: number[] = findCorrectResults(resultsPageHTML.data, ['FEATURE RACE']);

        return getAnyResults(resultsPageHTML.data, resultsIndex[0], [
            'laps',
            'time',
            'gap',
            'int',
            'kph',
            'best',
            'lap'
        ]);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
