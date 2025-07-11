import { getPracticeResults } from './scrappers/practice-results.scrapper.js';

async function f() {
    console.log(await getPracticeResults(2024, 1051, true));
}
f();
