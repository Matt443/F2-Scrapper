import { getDriverStandings } from '@/scrappers/driver-standings.scrappper';

describe('', () => {
    it('', async () => {
        expect(await getDriverStandings(2024)).toMatchSnapshot();
    });
    it('', async () => {
        expect(await getDriverStandings(2024, true)).toMatchSnapshot();
    });
});
