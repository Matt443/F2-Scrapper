import { staticLinks } from '@/consts/urls.const';
import { DriverStandings } from '@/types/scraped.type';
import { getStandingsTable } from '@/utils/scrapper.util';
import axios from 'axios';

export async function getTeamStandings(
    year: number = new Date().getFullYear(),
    racesDetails: boolean = false
): Promise<DriverStandings[]> {
    try {
        const driverStandingsURL = `${staticLinks.teamStandings}?seasonId=${174 + (year - 2017)}`;
        const response = await axios(driverStandingsURL);

        return getStandingsTable(year, response.data, racesDetails);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
