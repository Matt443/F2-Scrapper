import { baseLink, staticLinks } from '@/consts/urls.const';
import * as cheerio from 'cheerio';
import axios from 'axios';

export async function getDriverLineup() {
    try {
        const response = await axios(staticLinks.driverLineup);
        const $ = cheerio.load(response.data);

        $('.teams-and-drivers > .row > .teams-driver-item').each(function () {
            const name = $(this).find('.wrapper .brand-link').text().trim();
            const infoLink = baseLink + $(this).find('.wrapper a').attr('href') || '';
            const logoLink = baseLink + $(this).find('.wrapper .brand img').attr('data-src') || '';
            const carLink = baseLink + $(this).find('.wrapper .car img').attr('data-src') || '';
        });
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
