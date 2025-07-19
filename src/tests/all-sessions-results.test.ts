import { getAllSessionsResults } from '@/scrappers/all-sessions-results.scrapper';

describe('Testing getAllSessionsResults function', () => {
    it('Should return all sessions results from race weekend with id 1080 (2024)', async () => {
        expect(await getAllSessionsResults(2024, 1080)).toMatchSnapshot();
    });
    it('Should return all sessions results from race weekend in Monaco 2022', async () => {
        expect(await getAllSessionsResults(2022, 'Monaco')).toMatchSnapshot();
    });
    it('Should return all sessions results from race weekend with id 1051 (2024) | f3', async () => {
        expect(await getAllSessionsResults(2024, 1051, true)).toMatchSnapshot();
    });
    it('Should return all sessions results from race weekend in Monza 2022 | f3', async () => {
        expect(await getAllSessionsResults(2022, 'Monza', true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getAllSessionsResults(2016)).rejects.toThrow(Error);
    });
});
