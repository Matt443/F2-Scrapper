import { DriverSprintResults, ResultsTypes } from '@/types/scraped.type';
import { filterResults, findResultsURL, getAnyResults } from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {string | number} raceId
 * @param {boolean} [f3Results=false]
 * @returns {Promise<DriverRaceResult[]>}
 */
export async function getSprintResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
): Promise<DriverSprintResults[]> {
    try {
        // Finding URL with results
        const resultsURL = await findResultsURL(year, raceId, f3Results);

        const resultsPageHTML = await axios(resultsURL);
        //Defining requested result types
        const requestedResultTypes: ResultsTypes[] = [
            'SPRINT RACE',
            'SPRINT RACE 1',
            'SPRINT RACE 2'
        ];
        //Filtering result types
        const [resultIndexes, foundedIndexes] = filterResults(
            resultsPageHTML.data,
            requestedResultTypes
        );

        //Getting all founded results
        const resultsAllSprints = resultIndexes.map((index: number, i: number) => {
            return {
                raceType: requestedResultTypes[foundedIndexes[i]],
                results: getAnyResults(resultsPageHTML.data, index, [
                    'laps',
                    'time',
                    'gap',
                    'int',
                    'kph',
                    'best',
                    'lap'
                ])
            };
        });

        return resultsAllSprints;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
