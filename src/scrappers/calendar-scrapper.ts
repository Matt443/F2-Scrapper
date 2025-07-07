import { staticLinks } from '@/consts/urls.const';
import { RaceEvent } from '@/types/scraped.type';
import { getRaceWinnersCalendar, getSeasonId, raceStartEnd } from '@/utils/scrapper.util';
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
            const round = $(this).find('p.h6').text();
            const dateObj = {
                start: $(this).find('.date .start-date').text(),
                end: $(this).find('.date .end-date').text(),
                month: $(this).find('.date .month').text()
            };
            const eventName = $(this).find('.event-place span.ellipsis').text();

            const eventInfo: RaceEvent = {
                name: eventName,
                dates: raceStartEnd(year, `${dateObj.start}-${dateObj.end} ${dateObj.month}`),
                round: Number(round.slice(round.length - 2)),
                winners: []
            };

            const htmlContent = $(this).html();
            if (winnerDetails && htmlContent) {
                eventInfo.winners = getRaceWinnersCalendar(htmlContent);
            }
            events.push(eventInfo);
        });

        return events;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
