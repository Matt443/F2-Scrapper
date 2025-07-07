import { DriverStandings, RacesDetails, TableRace } from '@/types/scraped.type';
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

/**
 *
 * @param {string[]} driverPoints - ex. [sprintRace, featureRace, sprintRace, featureRace ...]
 * @param {RacesDetails} racesArray
 * @returns {RacesDetails[]}
 */
export function assignPointsToRaces(
    driverPoints: string[],
    racesArray: TableRace[]
): RacesDetails[] {
    let index = 0;
    const races: RacesDetails[] = [];
    for (const race of racesArray) {
        const currentIndex = index * 2;
        if (!(driverPoints[currentIndex] === '-' && driverPoints[currentIndex + 1] === '-')) {
            races.push({
                ...race,
                sprintRace: Number(driverPoints[currentIndex]),
                featureRace:
                    driverPoints[currentIndex + 1] !== '-'
                        ? Number(driverPoints[currentIndex + 1])
                        : null
            });
        }

        index++;
    }
    return races;
}

export function getStandingsTable(
    year: number,
    pageContent: string,
    racesDetails: boolean
): DriverStandings[] {
    const $ = cheerio.load(pageContent);
    const driverStandings: DriverStandings[] = [];

    $('table.table tbody tr').each(function () {
        const name = $(this).find('td:nth-child(1) .driver-name span:nth-child(1)').text();
        const code = $(this).find('td:nth-child(1) .driver-name span:nth-child(2)').text();
        const position = $(this).find('td:nth-child(1) .pos').text();
        const points = $(this).find('td:nth-child(2) .total-points').text();
        const driverScore = $(this)
            .find('td:nth-child(n+2) div.score')
            .map((_i, el) => $(el).text())
            .get();
        driverStandings.push(
            assignStandingsValues(
                [position, name, code, points, ...driverScore],
                year,
                pageContent,
                racesDetails
            )
        );
    });
    return driverStandings;
}

export function assignStandingsValues(
    driver: string[],
    year: number,
    pageContent: string,
    racesDetails: boolean
) {
    const driverDetails: DriverStandings = {
        position: Number(driver[0]),
        name: driver[1],
        code: driver[2],
        points: Number(driver[3])
    };
    if (racesDetails) {
        const races: TableRace[] = getTableRaces(year, pageContent);
        driverDetails.racesDetails = assignPointsToRaces(driver.slice(4), races);
    }
    return driverDetails;
}

/**
 *
 * @param {number} year 2017-now
 * @returns {number}
 */
export function getSeasonId(year: number): number {
    return 174 + (year - 2017);
}
