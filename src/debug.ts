import { getAllTracksDetails } from './scrappers/all-track-details.scrapper';

async function f() {
    const r = await getAllTracksDetails(2025);
    console.log(r, r.length);
}

f();
