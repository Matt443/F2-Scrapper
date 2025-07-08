import { getSprintResults } from '@/scrappers/sprint-results.scrapper';

describe('Testing getSprintResults function', () => {
    it('Should return sprint results with requsted number id', async () => {
        expect(await getSprintResults(2021, 1080)).toMatchSnapshot();
    });
    it('Should return sprint results with requsted string name of race', async () => {
        expect(await getSprintResults(2024, 'Sakhir')).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getSprintResults(2016)).rejects.toThrow(Error);
    });
});
