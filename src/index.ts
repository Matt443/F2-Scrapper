import { getTeamStandings } from './scrappers/team-standings.scrapper.js';

async function f() {
    console.log(await getTeamStandings(2024, true));
}

f();
