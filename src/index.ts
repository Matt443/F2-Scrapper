import { getDriverLineup } from './scrappers/driver-lineup.scrapper.js';

async function f() {
    console.log(await getDriverLineup());
}
f();
