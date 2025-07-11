import { getDriverStandings } from '@/scrappers/driver-standings.scrapper';

describe('Testing getDriverStandigns function', () => {
    it('Should return driver standings without racesDetails', async () => {
        expect(await getDriverStandings(2024)).toMatchSnapshot();
    });
    it('Should return driver standings with racesDetails', async () => {
        expect(await getDriverStandings(2024, true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getDriverStandings(2016, true)).rejects.toThrow(Error);
    });
    it('Should return f3 driver standings without racesDetails', async () => {
        expect(await getDriverStandings(2024, false, true)).toMatchSnapshot();
    });
    it('Should return f3 driver standings with racesDetails', async () => {
        expect(await getDriverStandings(2024, true, true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year | f3', async () => {
        await expect(getDriverStandings(2016, true, true)).rejects.toThrow(Error);
    });
});
