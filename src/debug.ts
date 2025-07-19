import { getAllSessionsResults } from './scrappers/all-sessions-results.scrapper';
import { getAllTracksDetails } from './scrappers/all-track-details.scrapper';
import { getTrackDetails } from './scrappers/track-details.scrapper';
// import { getCalendar } from './scrappers/calendar.scrapper';

async function f() {
    const r = await getAllSessionsResults();
    console.log(r);

    // console.log(await getCalendar(2023))
}

f();
