import { getHallOfFame } from '@/scrappers/hall-of-fame.scrapper';

describe('Testing getHallOfFame function', () => {
    it('Should return hall of fame', async () => {
        expect(await getHallOfFame()).toMatchSnapshot();
    });
});
