import { TableRace } from '@/types/scraped.type';
import { StartEndDates } from '@/types/utils.type';
import * as cheerio from 'cheerio';

/**
 *
 * @param {number} year
 * @param {string} pageContent
 * @returns {TableRace[]}
 */
export function getTableRaces(year: number, pageContent: string): TableRace[] {
    const $ = cheerio.load(pageContent);
    const races: TableRace[] = [];
    $('table.table thead tr th:nth-child(n+3) .country').each(function () {
        const name = $(this).find('div.country-name span').text().trim();
        let flagSrc = $(this).find('div.country-flag img').attr('data-src');
        const date = $(this).find('div.dates').text().trim();

        if (!flagSrc || flagSrc.length < 1) flagSrc = '';
        races.push({ name, flagSrc, dates: raceStartEnd(year, date) });
    });
    return races;
}

/**
 *
 * @param {number} year
 * @param {string} dateString
 * @returns {StartEndDates}
 */
export function raceStartEnd(year: number, dateString: string): StartEndDates {
    const startDate = `${dateString.slice(0, 2)} ${dateString.slice(6)} ${year}`;
    const endDate = `${dateString.slice(3, 5)} ${dateString.slice(6)} ${year}`;
    return {
        start: new Date(`${startDate} 00:00:00 GMT-0`),
        end: new Date(`${endDate} 23:59:59 GMT-0`)
    };
}

export function assignPointsToRaces(driverPoints: string[], racesArray: TableRace[]) {
    return racesArray.map((element, index) => {
        const currentIndex = index * 2;
        console.log(currentIndex);
        return {
            ...element,
            sprintRace:
                driverPoints[currentIndex] !== '-' ? Number(driverPoints[currentIndex]) : '-',
            featureRace:
                driverPoints[currentIndex + 1] !== '-'
                    ? Number(driverPoints[currentIndex + 1])
                    : '-'
        };
    });
}
