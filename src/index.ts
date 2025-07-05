import { getDriverStandings } from './scrappers/driver-standings.scrappper';

async function f() {
    console.log(await getDriverStandings(2025, true));
}

f();
