import { CircuitInfo, RaceEvent } from '@/types/scraped.type';
import { getCalendar } from './calendar.scrapper';
import { getTrackDetails } from './track-details.scrapper';
/**
 *
 * @param {number} year - 2017-now
 * @param [f3Results=false]
 * @returns {Promise<CircuitInfo>}
 */
export async function getAllTracksDetails(
    year: number = new Date().getFullYear(),
    f3Results: boolean = false
): Promise<CircuitInfo[]> {
    try {
        const raceEvents: RaceEvent[] = await getCalendar(year, false, f3Results);

        const tracksDetails = await Promise.all(
            raceEvents.map(async (raceEvent) => {
                return await getTrackDetails(raceEvent.name, year, f3Results);
            })
        );
        return tracksDetails.filter((trackDetails) => trackDetails !== false);
    } catch (error: unknown) {
        throw Error(error as string);
    }
}
