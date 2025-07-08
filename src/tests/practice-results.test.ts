import { getPracticeResults } from '@/scrappers/practice-results.scrapper';

describe('Testing getPracticeResults function', () => {
    it('Should return practice results with requsted number id', async () => {
        expect(await getPracticeResults(2024)).toMatchSnapshot();
    });
    it('Should return quali results with requsted string name of race', async () => {
        expect(await getPracticeResults(2024, 'Sakhir')).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getPracticeResults(2016)).rejects.toThrow(Error);
    });
});
