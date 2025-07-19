import { columns, resultTypesMap } from '@/consts/resultHelpers.const';
import { ResultsTypes } from '@/types/scraped.type';
import { findCorrectResults, findResultsURL, getAnyResults } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getAllSessionsResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir',
    f3Results: boolean = false
) {
    try {
        const resultsURL = await findResultsURL(year, raceId, f3Results);

        const resultsPageHTML = await axios(resultsURL);

        const $ = cheerio.load(resultsPageHTML.data);
        const allResultsHtml: string = $('.result-collapsible-wrapper .row > .col-12').html() || '';
        const columnsSets: string[][] = [columns.race, columns.race, columns.quali, columns.quali];
        const raceTypeSets: ResultsTypes[][] = [
            resultTypesMap.featureRace,
            resultTypesMap.sprintRace,
            resultTypesMap.quali,
            resultTypesMap.practice
        ];

        return columnsSets.map((columnsSet: string[], index: number) => {
            const resultsIndex: number[] = findCorrectResults(
                resultsPageHTML.data,
                raceTypeSets[index]
            );
            return getAnyResults(allResultsHtml, resultsIndex[0], columnsSet);
        });
    } catch (error: unknown) {
        throw Error(error as string);
    }
}
