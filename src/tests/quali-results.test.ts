import { getQualiResults } from '@/scrappers/quali-results.scrapper';

describe('Testing getQualiResults function', () => {
    it('Should return quali results with requsted number id', async () => {
        expect(await getQualiResults(2024, 1068)).toMatchSnapshot();
    });
    it('Should return quali results with requsted string name of race', async () => {
        expect(await getQualiResults(2024, 'Sakhir')).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getQualiResults(2016)).rejects.toThrow(Error);
    });
});
