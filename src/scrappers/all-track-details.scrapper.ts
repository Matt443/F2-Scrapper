import { CircuitInfo, RaceEvent } from '@/types/scraped.type';
import { getCalendar } from './calendar.scrapper';
import { getTrackDetails } from './track-details.scrapper';
/**
 *
 * @param {number} year - 2017-now
 * @param [f3Results=false]
 * @returns {Promise<CircuitInfo>}
 */
export async function getAllTrackDetails(
    year: number = new Date().getFullYear(),
    f3Results: boolean = false
): Promise<CircuitInfo[]> {
    try {
        const raceEvents: RaceEvent[] = await getCalendar(year, false, f3Results);

        const tracksDetails: CircuitInfo[] = [];
        for (const raceEvent of raceEvents) {
            const trackDetails = await getTrackDetails(raceEvent.name, year, f3Results);
            tracksDetails.push(trackDetails);
        }
        return tracksDetails;
    } catch (error: unknown) {
        throw Error(error as string);
    }
}
