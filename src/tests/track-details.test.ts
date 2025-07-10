import { getTrackDetails } from '@/scrappers/track-details.scrapper';

describe('Testing getTrackDetails function', () => {
    it('Should return team standings without racesDetails', async () => {
        expect(await getTrackDetails('Zandvoort', 2022)).toMatchSnapshot();
    });
    it('Should return team standings with racesDetails', async () => {
        expect(await getTrackDetails('Monaco')).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getTrackDetails('Monaco', 2016)).rejects.toThrow(Error);
    });
});
