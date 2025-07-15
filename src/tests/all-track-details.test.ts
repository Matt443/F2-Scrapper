import { getAllTrackDetails } from '@/scrappers/all-track-details.scrapper';

describe('Testing getAllTrackDetails function', () => {
    it('Should return all track details (2022)', async () => {
        expect(await getAllTrackDetails(2022, false)).toMatchSnapshot();
    }, 15000);
    it('Should return all truck details from f3', async () => {
        expect(await getAllTrackDetails(2022, true)).toMatchSnapshot();
    }, 15000);
    it('Should throw because this is wrong year', async () => {
        await expect(getAllTrackDetails(2016, false)).rejects.toThrow(Error);
    }, 15000);
});
