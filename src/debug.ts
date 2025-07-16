import { getAllTracksDetails } from './scrappers/all-track-details.scrapper';
// import { getCalendar } from './scrappers/calendar.scrapper';

async function f() {
    const r = await getAllTracksDetails(2023);
    console.log(r, r.length);

    // console.log(await getCalendar(2023))
}

f();
