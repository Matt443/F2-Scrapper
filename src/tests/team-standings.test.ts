import { getTeamStandings } from '@/scrappers/team-standings.scrapper';

describe('Testing getTeamStandigns function', () => {
    it('Should return team standings without racesDetails', async () => {
        expect(await getTeamStandings(2024)).toMatchSnapshot();
    });
    it('Should return team standings with racesDetails', async () => {
        expect(await getTeamStandings(2024, true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year', async () => {
        await expect(getTeamStandings(2016, true)).rejects.toThrow(Error);
    });
    it('Should return f3 team standings without racesDetails', async () => {
        expect(await getTeamStandings(2024, false, true)).toMatchSnapshot();
    });
    it('Should return f3 team standings with racesDetails', async () => {
        expect(await getTeamStandings(2024, true, true)).toMatchSnapshot();
    });
    it('Should throw because this is wrong year | f3', async () => {
        await expect(getTeamStandings(2016, true, true)).rejects.toThrow(Error);
    });
});
