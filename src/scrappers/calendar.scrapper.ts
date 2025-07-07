import { staticLinks } from '@/consts/urls.const';
import { RaceEvent } from '@/types/scraped.type';
import { getCalendarEvent, getRaceWinnersCalendar, getSeasonId } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getCalendar(
    year: number = new Date().getFullYear(),
    winnerDetails: boolean = false
): Promise<RaceEvent[]> {
    try {
        const driverStandingsURL = `${staticLinks.calendar}?seasonid=${getSeasonId(year)}`;
        const response = await axios(driverStandingsURL);

        const $ = cheerio.load(response.data);

        const events: RaceEvent[] = [];
        $('.calendar-layout .row:nth-child(2) >  .result-card').each(function () {
            const htmlContent = $(this).html();
            if (!htmlContent || htmlContent.length < 1) throw Error('Calendar html is empty');

            const eventInfo: RaceEvent = getCalendarEvent(htmlContent, year);

            if (winnerDetails) {
                eventInfo.winners = getRaceWinnersCalendar(htmlContent);
            }
            events.push(eventInfo);
        });

        return events;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
