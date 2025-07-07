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
    winners?: RaceWinner[];
}

export interface RaceWinner {
    name: string;
    imgLink: string;
    driverLink: string;
    raceType: RaceTypes;
}

export const allWinnerTypes = ['SR WINNER', 'FR WINNER', 'SR1 WINNER', 'SR2 WINNER'];
export type WinnerTypes = 'SR WINNER' | 'FR WINNER' | 'SR1 WINNER' | 'SR2 WINNER';

export type RaceTypes = 'Sprint' | 'Main Race' | 'Sprint 1' | 'Sprint 2';

export type RaceTypeStrategy = {
    returnType(): RaceTypes;
};
