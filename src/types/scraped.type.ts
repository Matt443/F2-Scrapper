import { StartEndDates } from './utils.type';

export interface DriverStandings {
    position: number;
    name: string;
    code: string;
    points: number;
    racesDetails?: RacesDetails[];
}

export type RacesDetails = TableRace & RacePoints;

export interface TableRace {
    name: string;
    flagSrc: string;
    dates: StartEndDates;
}

export interface RacePoints {
    sprintRace: number | null;
    featureRace: number | null;
}

export interface RaceEvent {
    name: string;
    dates: StartEndDates;
    round: number;
}
