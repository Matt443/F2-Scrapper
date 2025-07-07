import { getCalendar } from './scrappers/calendar.scrapper.js';

async function f() {
    const response = await getCalendar(2024, true);
    response.map((e) => console.log(e.winners));
}
f();
