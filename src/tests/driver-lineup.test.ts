import { getDriverLineup } from '@/scrappers/driver-lineup.scrapper';

describe('Testing getDriverLineup function', () => {
    it('Should return driver standings without racesDetails', async () => {
        expect(await getDriverLineup()).toMatchSnapshot();
    });
});
