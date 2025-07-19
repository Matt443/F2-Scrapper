import { resultTypesMap } from '@/consts/resultHelpers.const';
import { DriverQualiResult, ResultsTypes } from '@/types/scraped.type';
import {
    filterResults,
    findResultsURL,
    getAllQualisResults,
    getDateResults
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
): Promise<{ qualiType: ResultsTypes; results: DriverQualiResult[] }[]> {
    try {
        // Finding URL with results

        const resultsURL = await findResultsURL(year, raceId, f3Results);

        //Defining requested result types
        const resultsPageHTML = await axios(resultsURL);

        const dateStrings: string[] = getDateResults(resultsPageHTML.data);

        //Filtering result types
        const [resultIndexes, foundedIndexes] = filterResults(
            resultsPageHTML.data,
            resultTypesMap.quali
        );

        //Getting all founded results
        return getAllQualisResults(
            resultsPageHTML.data,
            dateStrings,
            resultIndexes,
            foundedIndexes
        );
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
