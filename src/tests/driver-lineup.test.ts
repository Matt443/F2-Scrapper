import { getDriverLineup } from '@/scrappers/driver-lineup.scrapper';

describe('Testing getDriverLineup function', () => {
    it('Should return f2 driver lineup', async () => {
        expect(await getDriverLineup()).toMatchSnapshot();
    });
    it('Should return f3 driver lineup', async () => {
        expect(await getDriverLineup(true)).toMatchSnapshot();
    });
});
