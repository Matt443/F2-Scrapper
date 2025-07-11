import * as cheerio from 'cheerio';
import axios from 'axios';
import { getDriverFromLineup } from '@/utils/scrapper.util';
import { TeamLineup } from '@/types/scraped.type';
import { getStaticLinks } from '@/consts/urls.const';

/**
 *
 * @param {boolean} [f3Results=false]
 * @returns {{season: number,series: string,teams: TeamLineup[]}}
 */
export async function getDriverLineup(f3Results: boolean = false): Promise<{
    season: number;
    series: string;
    teams: TeamLineup[];
}> {
    try {
        const response = await axios(getStaticLinks(f3Results).driverLineup);
        const $ = cheerio.load(response.data);

        const teamsHeader = $('.teams-and-drivers h1 span').text().trim();
        const season = Number(teamsHeader.slice(teamsHeader.length - 4, teamsHeader.length));
        const series = teamsHeader.slice(0, teamsHeader.length - 5);
        const baseLink = getStaticLinks(f3Results).base;
        const teams: TeamLineup[] = [];
        $('.teams-and-drivers > .row > .teams-driver-item').each(function () {
            const name = $(this).find('.wrapper .brand-link').text().trim();
            const infoLink = baseLink + $(this).find('.wrapper a').attr('href') || '';
            const logoLink = baseLink + $(this).find('.wrapper .brand img').attr('data-src') || '';
            const carLink = baseLink + $(this).find('.wrapper .car img').attr('data-src') || '';

            const drivers = getDriverFromLineup(
                $(this).find('.wrapper .drivers').html() || '',
                f3Results
            );

            teams.push({ name, infoLink, logoLink, carLink, drivers });
        });
        return { series, season, teams: teams.slice(0, teams.length - 1) };
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
