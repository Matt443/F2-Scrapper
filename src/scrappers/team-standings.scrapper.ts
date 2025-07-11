import { getDynamicLinks } from '@/consts/urls.const';
import { DriverStandings } from '@/types/scraped.type';
import { getSeasonId, getStandingsTable } from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {DriverStandings[]} racesDetails
 * @param {boolean} [f3Results=false]
 * @returns {Promise<DriverStandings[]}
 */
export async function getTeamStandings(
    year: number = new Date().getFullYear(),
    racesDetails: boolean = false,
    f3Results: boolean = false
): Promise<DriverStandings[]> {
    try {
        const teamStandingsURL = `${getDynamicLinks(f3Results).teamStandings}?seasonId=${getSeasonId(year)}`;
        const response = await axios(teamStandingsURL);

        return getStandingsTable(year, response.data, racesDetails);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
