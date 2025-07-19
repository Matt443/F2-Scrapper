import { resultTypesMap } from '@/consts/resultHelpers.const';
import { DriverRaceResult, ResultsTypes } from '@/types/scraped.type';
import { filterResults, findResultsURL, getAllSprintResults } from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {string | number} [raceId=Sakhir]
 * @param {boolean} [f3Results=false]
 * @returns {Promise<DriverRaceResult[]>}
 */
export async function getSprintResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
): Promise<{ raceType: ResultsTypes; results: DriverRaceResult[] }[]> {
    try {
        // Finding URL with results
        const resultsURL = await findResultsURL(year, raceId, f3Results);

        const resultsPageHTML = await axios(resultsURL);

        //Filtering result types
        const [resultIndexes, foundedIndexes] = filterResults(
            resultsPageHTML.data,
            resultTypesMap.sprintRace
        );

        //Getting all founded results
        return getAllSprintResults(resultsPageHTML.data, resultIndexes, foundedIndexes);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
