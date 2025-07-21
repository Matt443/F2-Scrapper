import { columns, resultTypesMap } from '@/consts/resultHelpers.const';
import {
    AllSessionsResults,
    DriverQualiResult,
    DriverQualiResults,
    DriverRaceResult,
    ResultsTypes
} from '@/types/scraped.type';
import {
    filterResults,
    findResultsURL,
    getAllQualisResults,
    getAllSprintResults,
    getAnyResults,
    getDateResults,
    getQualiPracticeResult
} from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {string | number} [raceId=Sakhir]
 * @param {boolean} [f3Results=false]
 * @returns {Promise<AllSessionsResults>}
 */
export async function getAllSessionsResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
): Promise<AllSessionsResults> {
    try {
        const resultsURL = await findResultsURL(year, raceId, f3Results);

        const resultsPageHTML = await axios(resultsURL);

        const raceTypeSets: ResultsTypes[][] = [
            resultTypesMap.featureRace,
            resultTypesMap.sprintRace,
            resultTypesMap.quali,
            resultTypesMap.practice
        ];

        const dateStrings: string[] = getDateResults(resultsPageHTML.data);
        const resultsIndexes = raceTypeSets.map((raceTypes: ResultsTypes[]) => {
            return filterResults(resultsPageHTML.data, raceTypes);
        });

        function catchErrors<T, K>(getter: () => T, defualtValue: K): T | K {
            try {
                return getter();
            } catch {
                return defualtValue;
            }
        }
        return {
            featureRace: catchErrors<DriverRaceResult[], []>(
                () => getAnyResults(resultsPageHTML.data, resultsIndexes[0][0][0], columns.race),
                []
            ),
            sprintRace: catchErrors<{ raceType: ResultsTypes; results: DriverRaceResult[] }[], []>(
                () =>
                    getAllSprintResults(
                        resultsPageHTML.data,
                        resultsIndexes[1][0],
                        resultsIndexes[1][1]
                    ),
                []
            ),
            qualiSessions: catchErrors<DriverQualiResults[], []>(
                () =>
                    getAllQualisResults(
                        resultsPageHTML.data,
                        dateStrings,
                        resultsIndexes[2][0],
                        resultsIndexes[2][1]
                    ),
                []
            ),
            practice: catchErrors<DriverQualiResult[], []>(
                () =>
                    getQualiPracticeResult(
                        resultsPageHTML.data,
                        resultsIndexes[3][0][0],
                        columns.quali,
                        dateStrings
                    ),
                []
            )
        };
    } catch (error: unknown) {
        throw Error(error as string);
    }
}
