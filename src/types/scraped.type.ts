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
    resultsLink?: string;
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

export type ResultsTypes =
    | 'FEATURE RACE'
    | 'SPRINT RACE'
    | 'QUALIFYING SESSION'
    | 'FREE PRACTICE'
    | 'SPRINT RACE 1'
    | 'SPRINT RACE 2'
    | 'QUALIFYING GROUP A'
    | 'QUALIFYING GROUP B';

export type RaceTypeStrategy = {
    returnType(): RaceTypes;
};

export interface DriverBaseResult {
    position: string;
    number: number;
    name: string;
    code: string;
    team: string;
}
export interface DriverRaceResult extends DriverBaseResult {
    laps: number;
    time: string;
    gap: string;
    int: string;
    kph: string;
    best: string;
    lap: number;
}

export interface DriverQualiResult extends DriverBaseResult {
    laps: number;
    time: string;
    gap: string;
    int: string;
    kph: string;
    lap_set_on: Date | string;
}

export interface DriverSprintResults {
    raceType: ResultsTypes;
    results: DriverRaceResult[];
}

export interface DriverQualiResults {
    qualiType: ResultsTypes;
    results: DriverQualiResult[];
}

export interface LineupDriver {
    name: string;
    imgLink: string;
    position: number;
    infoLink: string;
}

export interface TeamLineup {
    name: string;
    infoLink: string;
    logoLink: string;
    carLink: string;
    drivers: LineupDriver[];
}

export interface HallNameChampion {
    name: string;
    champion?: number;
}

export interface HallDriver extends HallNameChampion {
    imgLink: string;
}

export interface RaceLength {
    laps: number;
    length: string;
}

export interface CircuitInfo {
    trackName: string;
    trackMapImg: string;
    firstRace: number;
    circuitLength: string;
    sprintInfo: RaceLength;
    raceInfo: RaceLength;
    trackRecord: {
        time: string;
        speed: string;
        driver: string;
        team: string;
        year: number;
    };
}
