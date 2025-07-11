import { CircuitInfo } from '@/types/scraped.type';
import {
    assignTrackAdvancedInformation,
    assignTrackRecord,
    findResultsURL
} from '@/utils/scrapper.util';
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 *
 * @param {string} raceName - example Melburne, Monaco
 * @param {number} year - 2017-now
 * @param {boolean} [f3Results=false]
 * @returns {Promise<CircuitInfo>}
 */
export async function getTrackDetails(
    raceName: string,
    year: number = new Date().getFullYear(),
    f3Results: boolean = false
): Promise<CircuitInfo> {
    try {
        const resultsURL = await findResultsURL(year, raceName, f3Results);
        const resultsPageHTML = await axios(resultsURL);

        const $ = cheerio.load(resultsPageHTML.data);
        const trackName = //@ts-ignore
            $('.circuit-header-block .circuit-heading > h2').contents().get()[0].data as string;
        const trackMapImg = $('.circuit-information-row .column-image img').attr('data-src') || '';
        const circuitInformations: string[] = $(
            '.circuit-information-row .circuit-information .value, .circuit-information-row .circuit-information .value-light > span'
        )
            .map((_, el) => $(el).text())
            .get();

        const recordDesc = $('.circuit-information-row .circuit-records .value-light span').text();

        const circuitInfo: CircuitInfo = {
            trackName,
            trackMapImg,
            firstRace: Number(circuitInformations[0]),
            circuitLength: circuitInformations[1]
        };
        if (recordDesc !== 'n/a')
            circuitInfo.trackRecord = assignTrackRecord(resultsPageHTML.data, recordDesc);

        if (circuitInformations.length > 2) {
            const { sprintInfo, raceInfo } = assignTrackAdvancedInformation(circuitInformations);
            circuitInfo.sprintInfo = sprintInfo;
            circuitInfo.raceInfo = raceInfo;
        }
        return circuitInfo;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
