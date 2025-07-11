import { getDynamicLinks } from '@/consts/urls.const';
import { DriverStandings } from '@/types/scraped.type';
import { getSeasonId, getStandingsTable } from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {boolean} [racesDetails=false]
 * @param {boolean} [f3Results=false]
 * @returns {Promise<DriverStandings[]}
 */
export async function getDriverStandings(
    year: number = new Date().getFullYear(),
    racesDetails: boolean = false,
    f3Results: boolean = false
): Promise<DriverStandings[]> {
    try {
        const driverStandingsURL = `${getDynamicLinks(f3Results).driverStandings}?seasonId=${getSeasonId(year)}`;
        const response = await axios(driverStandingsURL);

        return getStandingsTable(year, response.data, racesDetails);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
