import { getCalendar } from './scrappers/calendar.scrapper.js';

async function f() {
    const response = await getCalendar(2021, true);
    response.map((e) => console.log(e.winners));
    console.log(response);
}
f();
