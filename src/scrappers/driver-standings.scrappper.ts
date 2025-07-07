import { staticLinks } from '@/consts/urls.const';
import { DriverStandings } from '@/types/scraped.type';
import { getSeasonId, getStandingsTable } from '@/utils/scrapper.util';
import axios from 'axios';

export async function getDriverStandings(
    year: number = new Date().getFullYear(),
    racesDetails: boolean = false
): Promise<DriverStandings[]> {
    try {
        const driverStandingsURL = `${staticLinks.driverStandings}?seasonId=${getSeasonId(year)}`;
        const response = await axios(driverStandingsURL);

        return getStandingsTable(year, response.data, racesDetails);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
