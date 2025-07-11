import { getCalendar } from '@/scrappers/calendar.scrapper';

describe('Testing getCalendar function', () => {
    it('Should return calendar without winners', async () => {
        expect(await getCalendar(2024)).toMatchSnapshot();
    });
    it('Should return calendar with winners', async () => {
        expect(await getCalendar(2024, true)).toMatchSnapshot();
    });
    it('Should return f3 calendar without winners', async () => {
        expect(await getCalendar(2024, false, true)).toMatchSnapshot();
    });
    it('Should return f3 calendar with winners', async () => {
        expect(await getCalendar(2024, true, true)).toMatchSnapshot();
    });
    it('Should throw because year is wrong', async () => {
        await expect(getCalendar(2016, true)).rejects.toThrow(Error);
    });
    it('Should throw because year is wrong', async () => {
        await expect(getCalendar(2016, true, true)).rejects.toThrow(Error);
    });
});
