import { CircuitInfo } from '@/types/scraped.type';
import { findResultsURL } from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 *
 * @param {string} raceName - example Melburne, Monaco
 * @param {number} year - 2017-now
 * @returns {Promise<CircuitInfo>}
 */
export async function getTrackDetails(
    raceName: string,
    year: number = new Date().getFullYear()
): Promise<CircuitInfo> {
    try {
        const resultsURL = await findResultsURL(year, raceName);
        const resultsPageHTML = await axios(resultsURL);

        const $ = cheerio.load(resultsPageHTML.data);

        const trackName = $('.circuit-header-block .circuit-heading > h2').contents().get()[0]
            .data as string;
        const trackMapImg = $('.circuit-information-row .column-image img').attr('data-src') || '';
        const circuitInformations: string[] = $(
            '.circuit-information-row .circuit-information .value, .circuit-information-row .circuit-information .value-light > span'
        )
            .map((_, el) => $(el).text())
            .get();
        const recordTime = $('.circuit-information-row .circuit-records .value').text();

        const recordDesc = $('.circuit-information-row .circuit-records .value-light span').text();

        const speed = recordDesc.slice(0, recordDesc.indexOf('H') + 1);
        const recordDriver = recordDesc.slice(
            recordDesc.indexOf('H') + 4,
            recordDesc.indexOf('(') - 1
        );
        const recordTeam = recordDesc.slice(recordDesc.indexOf('(') + 1, recordDesc.indexOf(')'));
        const recordYear = Number(recordDesc.slice(recordDesc.length - 4));
        return {
            trackName,
            trackMapImg,
            firstRace: Number(circuitInformations[0]),
            circuitLength: circuitInformations[1],
            sprintInfo: {
                laps: Number(circuitInformations[2].slice(0, 3)),
                length: circuitInformations[3]
            },
            raceInfo: {
                laps: Number(circuitInformations[4].slice(0, 3)),
                length: circuitInformations[5]
            },
            trackRecord: {
                time: recordTime,
                speed,
                driver: recordDriver,
                team: recordTeam,
                year: recordYear
            }
        };
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
