import { columns, resultTypesMap } from '@/consts/resultHelpers.const';
import { DriverRaceResult } from '@/types/scraped.type';
import { findCorrectResults, findResultsURL, getAnyResults } from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {string | number} [raceId=Sakhir]
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
        const resultsIndex: number[] = findCorrectResults(
            resultsPageHTML.data,
            resultTypesMap.featureRace
        );

        return getAnyResults(resultsPageHTML.data, resultsIndex[0], columns.race);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
