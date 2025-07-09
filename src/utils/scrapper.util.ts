import { baseLink, staticLinks } from '@/consts/urls.const';
import {
    allWinnerTypes,
    DriverBaseResult,
    DriverQualiResult,
    DriverRaceResult,
    DriverStandings,
    LineupDriver,
    RaceEvent,
    RacesDetails,
    RaceWinner,
    ResultsTypes,
    TableRace,
    WinnerTypes
} from '@/types/scraped.type';
import { StartEndDates } from '@/types/utils.type';
import * as cheerio from 'cheerio';
import { raceTypeStrategy } from './race-type.strategy.util';
import { getCalendar } from '@/scrappers/calendar.scrapper';
import { arrayToObj, filterWithIndex, indexAtFound } from './common.util';

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
    const startDay = dateString.slice(0, 2);
    const endDay = dateString.slice(3, 5);
    const startDate = `${startDay} ${dateString.slice(6)} ${year}`;
    const endDate = `${endDay} ${dateString.slice(6)} ${year}`;
    const startEndObj: StartEndDates = {
        start: new Date(`${startDate} 00:00:00 GMT-0`),
        end: new Date(`${endDate} 23:59:59 GMT-0`)
    };

    if (Number(startDay) - Number(endDay) > 0)
        startEndObj.start.setMonth(startEndObj.start.getMonth() - 1);
    return startEndObj;
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

/**
 *
 * @param {number} year
 * @param {string} pageContent
 * @param {boolean} racesDetails
 * @returns {DriverStandings}
 */
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

/**
 *
 * @param {string} driver
 * @param {number} year
 * @param {string} pageContent
 * @param {boolean} racesDetails
 * @returns
 */
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

/**
 *
 * @param {string} htmlContent
 * @param {number} [i=0]
 * @returns {boolean}
 */
export function getCalendarDriver(htmlContent: string, i: number = 0): RaceWinner {
    const $ = cheerio.load(htmlContent);
    const winnerType = $(
        `.drivers .col:nth-child(${i + 1}) .drivers-wrapper .race-position`
    ).text();

    if (!allWinnerTypes.includes(winnerType)) throw Error('Unknown winner type');
    const eventDetails: RaceWinner = {
        name: $(`.drivers .col:nth-child(${i + 1}) .drivers-wrapper span.driver-name`).text(),
        imgLink: $(`.drivers .col:nth-child(${i + 1}) .drivers-wrapper img`).attr('data-src') || '',
        driverLink: `${baseLink}${$(`.drivers .col:nth-child(${i + 1}) .drivers-wrapper a`).attr(
            'href'
        )}`,
        raceType: raceTypeStrategy[winnerType as WinnerTypes].returnType()
    };

    return eventDetails;
}

/**
 *
 * @param {string} htmlContent
 * @param {number} [i=0]
 * @returns {boolean}
 */
export function isCalendarDriverDefined(htmlContent: string, i: number = 0): boolean {
    const $ = cheerio.load(htmlContent);
    if (
        $(`.drivers .col:nth-child(${i + 1}) .drivers-wrapper`).length > 0 &&
        $(`.drivers .col:nth-child(${i + 1}) .drivers-wrapper .cancelled`).length < 1
    )
        return true;
    return false;
}

/**
 *
 * @param {string} htmlContent
 * @returns {RaceWinner[]}
 */
export function getRaceWinnersCalendar(htmlContent: string): RaceWinner[] {
    const $ = cheerio.load(htmlContent);
    const driversQuanity = $('.drivers > .col').length;
    const winners: RaceWinner[] = [];
    for (let i = 0; i < driversQuanity; i++) {
        if (isCalendarDriverDefined(htmlContent, i)) {
            winners.push(getCalendarDriver(htmlContent, i));
        }
    }
    return winners;
}

/**
 *
 * @param {string} htmlContent
 * @returns {EventInfo[]}
 */
export function getCalendarEvent(htmlContent: string, year: number): RaceEvent {
    const $ = cheerio.load(htmlContent);
    const round = $('p.h6').text();
    const dateObj = {
        start: $('.date .start-date').text(),
        end: $('.date .end-date').text(),
        month: $('.date .month').text()
    };
    const eventName = $('.event-place span.ellipsis').text();
    const resultsURL = $('.wrapper a').attr('href');

    const eventDetails: RaceEvent = {
        name: eventName,
        dates: raceStartEnd(year, `${dateObj.start}-${dateObj.end} ${dateObj.month}`),
        round: Number(round.slice(round.length - 2))
    };

    if (resultsURL) eventDetails.resultsLink = `${baseLink}${resultsURL}`;
    return eventDetails;
}

/**
 *
 * @param {RaceEvent[]} races
 * @param {string} searchedName
 * @returns {string}
 */
export function findRaceResults(races: RaceEvent[], searchedName: string): string {
    const foundedRace = races.find((race: RaceEvent) => {
        if (race.name.toLocaleLowerCase() === searchedName.toLowerCase()) return true;
    });

    if (!foundedRace?.resultsLink) throw Error("Results link can't be found.");
    return foundedRace.resultsLink;
}

/**
 *
 * @param {number} year
 * @param {string | number} raceId - number example = 1079, string example = Sakhir
 * @returns {Promise<string>}
 */
export async function findResultsURL(year: number, raceId: string | number): Promise<string> {
    let resultsURL = `${staticLinks.results}?raceid=${raceId}`;
    if (Number.isNaN(Number(raceId))) {
        resultsURL = findRaceResults(await getCalendar(year), raceId as string);
    }
    return resultsURL;
}

/**
 *
 * @param {string} resultsHTML
 * @param {ResultsTypes} requestedType
 * @returns {number}
 */
export function findCorrectResults(resultsHTML: string, requestedTypes: ResultsTypes[]): number[] {
    const availableResults = getAllResultsTypes(resultsHTML);
    return ifCorrectResultsExists(availableResults, requestedTypes);
}

/**
 *
 * @param {string} resultsHTML
 * @returns {ResultsTypes[]}
 */
export function getAllResultsTypes(resultsHTML: string): ResultsTypes[] {
    const $ = cheerio.load(resultsHTML);

    const availableResults: ResultsTypes[] = [];
    $('.result-collapsible-wrapper h2 > p > span').each(function () {
        availableResults.push($(this).text().trim().toLocaleLowerCase() as ResultsTypes);
    });
    return availableResults;
}

/**
 *
 * @param {ResultsTypes[]} availableResults
 * @param {ResultsTypes} requestedType
 * @returns {number}
 */

export function ifCorrectResultsExists(
    availableResults: ResultsTypes[],
    requestedTypes: ResultsTypes[]
): number[] {
    return requestedTypes.map((requestedType: ResultsTypes) => {
        return availableResults.indexOf(requestedType.toLocaleLowerCase() as ResultsTypes);
    });
}

/**
 *
 * @param {string} htmlContent
 * @returns {DriverBaseResult}
 */
export function getBasicsResultsTable(htmlContent: string): DriverBaseResult {
    const $ = cheerio.load(htmlContent);

    const position = $('div.pos').text();
    const number = Number($('div.car-no').text());
    const name = $('.driver-name .visible-desktop-up').text();
    const code = $('.driver-name .visible-desktop-down').text();
    const team = $('span.team-name').text();

    return { position, number, name, code, team };
}

/**
 *
 * @param {string} htmlContent
 * @param {number} index - index of div with results
 * @param {string[]} otherColumns - list of columns to without base informations
 * @returns {DriverRaceResult[]}
 */
export function getAnyResults(
    htmlContent: string,
    index: number,
    otherColumns: string[]
): DriverRaceResult[] {
    const $ = cheerio.load(htmlContent);

    const tablePath = `.result-collapsible-wrapper .collapsible:nth-child(${index + 1}) .standings-table table.table tbody tr`;

    const driverResults: DriverRaceResult[] = [];
    $(tablePath).each(function () {
        const { position, number, name, code, team, otherValues } = getFromResultsTable(
            $(this).html() || ''
        );

        const driver = {
            position,
            number,
            name,
            code,
            team,
            ...arrayToObj(otherValues, otherColumns)
        } as DriverRaceResult;

        driverResults.push(fixRaceResult(driver));
    });
    return driverResults;
}

/**
 *
 * @param {string} htmlContent
 * @param {number} index  - index of div with results
 * @param {string[]} otherColumns - list of columns to without base informations
 * @param {string[]} dateStrings
 * @returns
 */
export function getQualiPracticeResult(
    htmlContent: string,
    index: number,
    otherColumns: string[],
    dateStrings: string[]
) {
    const $ = cheerio.load(htmlContent);

    const tablePath = `.result-collapsible-wrapper .collapsible:nth-child(${index + 1}) .standings-table table.table tbody tr`;

    const driverResults: DriverQualiResult[] = [];
    $(tablePath).each(function () {
        const { position, number, name, code, team, otherValues } = getFromResultsTable(
            $(this).html() || ''
        );

        const driver = {
            position,
            number,
            name,
            code,
            team,
            ...arrayToObj(otherValues, otherColumns)
        } as DriverQualiResult;

        driverResults.push(fixQualiResult(driver, dateStrings));
    });
    return driverResults;
}

export function getFromResultsTable(htmlContent: string) {
    const $ = cheerio.load(htmlContent);
    const { position, number, name, code, team } = getBasicsResultsTable(htmlContent);

    const otherValues: string[] = $('.score-wrapper')
        .map((_i, el) => $(el).text())
        .get();

    return { position, number, name, code, team, otherValues };
}

/**
 *
 * @param {DriverRaceResult} driver
 * @returns {DriverRaceResult}
 */
export function fixRaceResult(driver: DriverRaceResult): DriverRaceResult {
    driver.laps = Number(driver.laps);
    driver.lap = Number(driver.lap);
    return driver;
}

/**
 *
 * @param {string} htmlContent
 * @returns {string}
 */
export function getDateResults(htmlContent: string): string[] {
    const $ = cheerio.load(htmlContent);
    const dateString = $(
        '.circuit-header-wrapper .country-info .schedule > span:nth-child(2)'
    ).text();

    return [`${dateString.slice(0, 2)}${dateString.slice(5)}`, dateString.slice(3)];
}

export function fixQualiResult(
    driver: DriverQualiResult,
    dateStrings: string[]
): DriverQualiResult {
    const startDay = dateStrings[0].slice(0, 2);
    const endDay = dateStrings[1].slice(0, 2);
    let { lap_set_on } = driver;
    lap_set_on = new Date(`${dateStrings[0]} ${lap_set_on} GMT-0`);

    if (Number(startDay) - Number(endDay) > 0) lap_set_on.setMonth(lap_set_on.getMonth() - 1);
    return { ...driver, lap_set_on };
}

/**
 *
 * @param {string} htmlContent
 * @param {ResultsTypes[]} requestedResultTypes
 * @returns {[number[], number[]]}
 */
export function filterResults(
    htmlContent: string,
    requestedResultTypes: ResultsTypes[]
): [number[], number[]] {
    const resultsIndex: number[] = findCorrectResults(htmlContent, requestedResultTypes);

    const filterResult = filterWithIndex(resultsIndex, indexAtFound) as [number[], number[]];

    return filterResult;
}

/**
 *
 * @param {string} htmlContent
 * @returns {LineupDriver[]}
 */
export function getDriverFromLineup(htmlContent: string): LineupDriver[] {
    const $ = cheerio.load(htmlContent);

    const driver: LineupDriver[] = [];
    $('.driver').each(function () {
        const infoLink = baseLink + $(this).find('.image-wrapper').attr('href') || '';
        const imgLink = $(this).find('.image-wrapper img').attr('data-src') || '';
        const name = $(this).find('.name-wrapper .name').text();
        //???
        const position = Number($(this).find('.name-wrapper .position').text());

        driver.push({ infoLink, imgLink, name, position });
    });

    return driver;
}
