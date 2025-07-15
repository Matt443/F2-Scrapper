import { getAllTrackDetails } from './scrappers/all-track-details.scrapper';
import { getTrackDetails } from './scrappers/track-details.scrapper';

async function f() {
    const r = await getAllTrackDetails(2025);
    console.log(r, r.length);
}

f();
