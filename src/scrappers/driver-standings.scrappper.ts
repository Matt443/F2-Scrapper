import { staticLinks } from '@/consts/urls.const';
import { DriverStandings, TableRace } from '@/types/scraped.type';
import { assignPointsToRaces, getTableRaces } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getDriverStandings(
    year: number = new Date().getFullYear(),
    racesDetails: boolean = true
): Promise<DriverStandings[]> {
    try {
        const driverStandingsURL = `${staticLinks.driverStandings}?seasonId=${174 + (year - 2017)}`;
        const response = await axios(driverStandingsURL);

        const $ = cheerio.load(response.data);
        const driverStandings: DriverStandings[] = [];

        $('table.table tbody tr').each(function () {
            const name = $(this).find('td:nth-child(1) .driver-name span:nth-child(1)').text();
            const code = $(this).find('td:nth-child(1) .driver-name span:nth-child(2)').text();
            const position = $(this).find('td:nth-child(1) .pos').text();
            const points = $(this).find('td:nth-child(2) .total-points').text();
            const driverScore = $(this)
                .find('td:nth-child(n+2) div.score')
                .map((_i, el) => $(el).text())
                .get();
            driverStandings.push(assignTableValues([position, name, code, points, ...driverScore]));
        });

        function assignTableValues(driver: string[]) {
            const driverDetails = {
                position: Number(driver[0]),
                name: driver[1],
                code: driver[2],
                points: Number(driver[3])
            };
            if (racesDetails) {
                const racesDetails: TableRace[] = getTableRaces(year, response.data);
                console.log(assignPointsToRaces(driver.slice(4), racesDetails), driver[1]);
            }
            return driverDetails;
        }
        return driverStandings;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
