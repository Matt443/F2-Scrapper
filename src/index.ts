import { getDriverStandings } from './scrappers/driver-standings.scrappper.js';

async function f() {
    console.log(await getDriverStandings(2024, true));
}

f();
