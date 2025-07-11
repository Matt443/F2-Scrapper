interface StaticLinks {
    driverStandings: string;
    teamStandings: string;
    calendar: string;
    results: string;
}

export function getDynamicLinks(f3Results: boolean): StaticLinks {
    let series = 2;
    if (f3Results) series = 3;
    return {
        driverStandings: `https://www.fiaformula${series}.com/Standings/Driver`,
        teamStandings: `https://www.fiaformula${series}.com/Standings/Team`,
        calendar: `https://www.fiaformula${series}.com/Calendar`,
        results: `https://www.fiaformula${series}.com/Results`
    };
}

export function getStaticLinks(f3Results: boolean) {
    let series = 2;
    if (f3Results) series = 3;
    return {
        base: `https://www.fiaformula${series}.com`,
        hallOfFame: `https://www.fiaformula${series}.com/Latest/Tag/7qxt08zINzXMSGfrzTzDys/Hall-of-Fame`,
        driverLineup: `https://www.fiaformula${series}.com/Teams-and-Drivers`
    };
}
