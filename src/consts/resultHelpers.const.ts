import { ResultsTypes } from '@/types/scraped.type';

export const columns = {
    race: ['laps', 'time', 'gap', 'int', 'kph', 'best', 'lap'],
    quali: ['laps', 'time', 'gap', 'int', 'kph', 'lap_set_on']
};

export const resultTypesMap: {
    featureRace: ResultsTypes[];
    sprintRace: ResultsTypes[];
    quali: ResultsTypes[];
    practice: ResultsTypes[];
} = {
    featureRace: ['FEATURE RACE'],
    sprintRace: ['SPRINT RACE', 'SPRINT RACE 1', 'SPRINT RACE 2'],
    quali: ['QUALIFYING SESSION', 'QUALIFYING GROUP A', 'QUALIFYING GROUP B', 'QUALIFYING'],
    practice: ['FREE PRACTICE', 'PRACTICE']
};
