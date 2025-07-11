import { getRaceResults } from '@/scrappers/race-results.scrapper';

describe('Testing getRaceResults function', () => {
    it('Should return race results with requsted number id', async () => {
        expect(await getRaceResults(2024, 1080)).toMatchSnapshot();
    });
    it('Should return race results with requsted string name of race', async () => {
        expect(await getRaceResults(2024, 'Sakhir')).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getRaceResults(2016)).rejects.toThrow(Error);
    });
    it('Should return f3 race results with requsted number id', async () => {
        expect(await getRaceResults(2024, 1055, true)).toMatchSnapshot();
    });
    it('Should return f3 race results with requsted string name of race', async () => {
        expect(await getRaceResults(2024, 'Sakhir', true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year | f3', async () => {
        await expect(getRaceResults(2016, 'Monaco', true)).rejects.toThrow(Error);
    });
});
