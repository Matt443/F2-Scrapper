import { getDynamicLinks } from '@/consts/urls.const';
import { RaceEvent } from '@/types/scraped.type';
import { getCalendarEvent, getRaceWinnersCalendar, getSeasonId } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 *
 * @param {number} year
 * @param {boolean} [winnerDetails=false]
 * @param {boolean} [f3Results=false]
 * @returns {Promise<RaceEvent[]>}
 */
export async function getCalendar(
    year: number = new Date().getFullYear(),
    winnerDetails: boolean = false,
    f3Results: boolean = false
): Promise<RaceEvent[]> {
    try {
        const calendarURL = `${getDynamicLinks(f3Results).calendar}?seasonid=${getSeasonId(year)}`;
        const response = await axios(calendarURL);

        const $ = cheerio.load(response.data);

        const events: RaceEvent[] = [];
        $('.calendar-layout .row:nth-child(2) >  .result-card').each(function () {
            const htmlContent = $(this).html();
            if (!htmlContent || htmlContent.length < 1) throw Error('Calendar html is empty');

            const eventInfo: RaceEvent = getCalendarEvent(htmlContent, year, f3Results);

            if (winnerDetails) {
                eventInfo.winners = getRaceWinnersCalendar(htmlContent, f3Results);
            }
            events.push(eventInfo);
        });

        return events;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
