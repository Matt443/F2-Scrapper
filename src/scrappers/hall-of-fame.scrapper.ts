import { hallOfFameLink } from '@/consts/urls.const';
import { HallDriver } from '@/types/scraped.type';
import { hallIsChampion } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getHallOfFame(): Promise<HallDriver[]> {
    try {
        const hallOfFameResponse = await axios(hallOfFameLink);

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
