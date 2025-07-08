import { staticLinks } from '@/consts/urls.const';
import { DriverStandings } from '@/types/scraped.type';
import { getSeasonId, getStandingsTable } from '@/utils/scrapper.util';
import axios from 'axios';

/**
 *
 * @param {number} year
 * @param {DriverStandings[]} racesDetails
 * @returns {Promise<DriverStandings[]}
 */
export async function getTeamStandings(
    year: number = new Date().getFullYear(),
    racesDetails: boolean = false
): Promise<DriverStandings[]> {
    try {
        const teamStandingsURL = `${staticLinks.teamStandings}?seasonId=${getSeasonId(year)}`;
        const response = await axios(teamStandingsURL);

        return getStandingsTable(year, response.data, racesDetails);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
