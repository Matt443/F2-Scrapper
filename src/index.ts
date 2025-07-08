import { getSprintResults } from './scrappers/sprint-results.scrapper.js';

async function f() {
    console.log(await getSprintResults(2021));
}
f();
