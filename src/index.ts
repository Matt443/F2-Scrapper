import { getRaceResults } from './scrappers/race-results.scrapper.js';

async function f() {
    console.log(await getRaceResults(2024));
}
f();
