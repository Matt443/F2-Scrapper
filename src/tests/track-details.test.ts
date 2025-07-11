import { getTrackDetails } from '@/scrappers/track-details.scrapper';

describe('Testing getTrackDetails function', () => {
    it('Should return Zandvoort track details (2022)', async () => {
        expect(await getTrackDetails('Zandvoort', 2022)).toMatchSnapshot();
    });
    it('Should return Zandvoort Monaco details', async () => {
        expect(await getTrackDetails('Monaco')).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getTrackDetails('Monaco', 2016)).rejects.toThrow(Error);
    });
    it('Should return Zandvoort f3 track details (2022)', async () => {
        expect(await getTrackDetails('Zandvoort', 2022, true)).toMatchSnapshot();
    });
    it('Should return Monaco details f3', async () => {
        expect(await getTrackDetails('Monaco', 2025, true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year | f3', async () => {
        await expect(getTrackDetails('Monaco', 2016, true)).rejects.toThrow(Error);
    });
});
