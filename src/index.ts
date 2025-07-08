import { getQualiResults } from './scrappers/quali-results.scrapper.js';

async function f() {
    console.log(await getQualiResults(2024));
}
f();
