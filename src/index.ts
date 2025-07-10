import { getHallOfFame } from './scrappers/hall-of-fame.scrapper.js';

async function f() {
    console.log(await getHallOfFame());
}
f();
