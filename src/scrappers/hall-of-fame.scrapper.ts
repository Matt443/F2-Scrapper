import { getStaticLinks } from '@/consts/urls.const';
import { HallDriver } from '@/types/scraped.type';
import { hallIsChampion } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 *
 * @param {boolean} [f3Results=false]
 * @returns {Promise<HallDriver[]>}
 */
export async function getHallOfFame(f3Results: boolean = false): Promise<HallDriver[]> {
    try {
        const hallOfFameResponse = await axios(getStaticLinks(f3Results).hallOfFame);

        const $ = cheerio.load(hallOfFameResponse.data);

        const drivers: HallDriver[] = [];
        $('.hall-of-fame .article-listing-card--inner .article-listing-card--item').each(
            function () {
                const imgLink =
                    $(this).find('.driver-profile .driver-profile--image img').attr('data-src') ||
                    '';
                const nameString = $(this)
                    .find('.driver-profile--wrapper h2.driver-profile--info-surname')
                    .text();

                const nameChampion = hallIsChampion(nameString);

                drivers.push({ imgLink, ...nameChampion });
            }
        );
        return drivers;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
