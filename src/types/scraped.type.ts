import { StartEndDates } from './utils.type';

export interface DriverStandings {
    position: number;
    name: string;
    code: string;
    points: number;
    races?: TableRace;
}

export interface TableRace {
    name: string;
    flagSrc: string;
    dates: StartEndDates;
}
