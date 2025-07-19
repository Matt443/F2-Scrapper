import { columns, resultTypesMap } from '@/consts/resultHelpers.const';
import { ResultsTypes } from '@/types/scraped.type';
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

export async function getAllSessionsResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
) {
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

        return {
            featureRace: getAnyResults(resultsPageHTML.data, resultsIndexes[0][0][0], columns.race),
            sprintRace: getAllSprintResults(
                resultsPageHTML.data,
                resultsIndexes[1][0],
                resultsIndexes[1][1]
            ),
            qualiSessions: getAllQualisResults(
                resultsPageHTML.data,
                dateStrings,
                resultsIndexes[2][0],
                resultsIndexes[2][1]
            ),
            practice: getQualiPracticeResult(
                resultsPageHTML.data,
                resultsIndexes[3][0][0],
                columns.quali,
                dateStrings
            )
        };
    } catch (error: unknown) {
        throw Error(error as string);
    }
}
