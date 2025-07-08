import { DriverRaceResult } from '@/types/scraped.type';
import { arrayToObj } from '@/utils/common.util';
import { findCorrectResults, findResultsURL, getBasicsResultsTable } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getRaceResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir'
): Promise<DriverRaceResult[]> {
    try {
        const resultsURL = await findResultsURL(year, raceId);

        const resultsPageHTML = await axios(resultsURL);
        const resultsIndex: number[] = findCorrectResults(resultsPageHTML.data, ['FEATURE RACE']);

        const $ = cheerio.load(resultsPageHTML.data);

        const tablePath = `.result-collapsible-wrapper .collapsible:nth-child(${resultsIndex[0] + 1}) .standings-table table.table tbody tr`;

        const driverResults: DriverRaceResult[] = [];
        $(tablePath).each(function () {
            const { position, number, name, code, team } = getBasicsResultsTable(
                $(this).html() || ''
            );

            const otherValues: string[] = $(this)
                .find('td .score-wrapper')
                .map((_i, el) => $(el).text())
                .get();

            const driver = {
                position,
                number,
                name,
                code,
                team,
                ...arrayToObj(otherValues, ['laps', 'time', 'gap', 'int', 'kph', 'best', 'lap'])
            } as DriverRaceResult;

            driver.laps = Number(driver.laps);
            driver.lap = Number(driver.lap);
            driverResults.push(driver);
        });

        return driverResults;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
