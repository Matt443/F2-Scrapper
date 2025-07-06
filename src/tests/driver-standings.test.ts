import { getDriverStandings } from '@/scrappers/driver-standings.scrappper';

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
});
