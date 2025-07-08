import { DriverSprintResults, ResultsTypes } from '@/types/scraped.type';
import { filterWithIndex } from '@/utils/common.util';
import {
    findCorrectResults,
    findResultsURL,
    fixRaceResult,
    getAnyResults
} from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {string | number} raceId
 * @returns {Promise<DriverRaceResult[]>}
 */
export async function getSprintResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir'
): Promise<DriverSprintResults[]> {
    try {
        const resultsURL = await findResultsURL(year, raceId);

        const resultsPageHTML = await axios(resultsURL);
        const requestedResultTypes: ResultsTypes[] = [
            'SPRINT RACE',
            'SPRINT RACE 1',
            'SPRINT RACE 2'
        ];
        const resultsIndex: number[] = findCorrectResults(
            resultsPageHTML.data,
            requestedResultTypes
        );

        const [resultIndexes, foundedIndexes] = filterWithIndex(
            resultsIndex,
            (element: unknown) => typeof element === 'number' && element > -1
        ) as [number[], number[]];

        const resultsAllSprints = resultIndexes.map((index: number, i: number) => {
            return {
                raceType: requestedResultTypes[foundedIndexes[i]],
                results: getAnyResults(
                    resultsPageHTML.data,
                    index,
                    ['laps', 'time', 'gap', 'int', 'kph', 'best', 'lap'],
                    fixRaceResult
                )
            };
        });

        return resultsAllSprints;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
