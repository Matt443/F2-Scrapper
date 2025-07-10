import { getTrackDetails } from './scrappers/track-details.scrapper.js';

async function f() {
    console.log(await getTrackDetails('Zandvoort', 2022));
}
f();
