import { getCalendar } from './scrappers/calendar-scrapper.js';

async function f() {
    console.log(await getCalendar(2021, true));
}

f();
