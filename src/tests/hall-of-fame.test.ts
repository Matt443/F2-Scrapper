import { getHallOfFame } from '@/scrappers/hall-of-fame.scrapper';

describe('Testing getHallOfFame function', () => {
    it('Should return hall of fame', async () => {
        expect(await getHallOfFame()).toMatchSnapshot();
    });
    it('Should return f3 hall of fame', async () => {
        expect(await getHallOfFame(true)).toMatchSnapshot();
    });
});
