import { getPracticeResults } from '@/scrappers/practice-results.scrapper';

describe('Testing getPracticeResults function', () => {
    it('Should return practice results with requsted number id', async () => {
        expect(await getPracticeResults(2024, 1080)).toMatchSnapshot();
    });
    it('Should return practice results with requsted string name of race', async () => {
        expect(await getPracticeResults(2024, 'Sakhir')).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getPracticeResults(2016)).rejects.toThrow(Error);
    });
    it('Should return f3 practice results with requsted number id', async () => {
        expect(await getPracticeResults(2024, 1051, true)).toMatchSnapshot();
    });
    it('Should return f3 practice results with requsted string name of race', async () => {
        expect(await getPracticeResults(2024, 'Sakhir', true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year | f3', async () => {
        await expect(getPracticeResults(2016, 'Monaco', true)).rejects.toThrow(Error);
    });
});
