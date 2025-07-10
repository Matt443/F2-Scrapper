import { getHallOfFame } from './scrappers/hall-of-fame.scrapper.js';
import { getTrackDetails } from './scrappers/track-details.scrapper.js';

async function f() {
    console.log(await getTrackDetails('Monaco'));
}
f();
