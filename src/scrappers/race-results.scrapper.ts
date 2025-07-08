import { DriverRaceResult } from '@/types/scraped.type';
import { findCorrectResults, findResultsURL, getAnyResults } from '@/utils/scrapper.util';
import axios from 'axios';

export async function getRaceResults(
    year: number = new Date().getFullYear(),
    raceId: string | number = 'Sakhir'
): Promise<DriverRaceResult[]> {
    try {
        const resultsURL = await findResultsURL(year, raceId);

        const resultsPageHTML = await axios(resultsURL);
        const resultsIndex: number[] = findCorrectResults(resultsPageHTML.data, ['FEATURE RACE']);

        return getAnyResults(resultsPageHTML.data, resultsIndex[0], [
            'laps',
            'time',
            'gap',
            'int',
            'kph',
            'best',
            'lap'
        ]);
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
