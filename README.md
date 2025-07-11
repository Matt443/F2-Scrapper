# F2F3-Scrapper

A Node.js web scraping tool for extracting data from F2 Website and F3 Website.

## Installation

```bash
git clone https://github.com/Matt443/F2-Scrapper.git
cd F2-Scrapper
npm install
```

## Usage

**For development:**

```bash
npm run dev
```

## Functions

### **1. getDriverStandings**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | if `racesDetails` property should be attached                             | `False`          |
| No              | `True` for **f3** standings and `False` for **f2** standings              | `False`          |

```js
[
  {
    code: "BOR",
    name: "G. Bortoleto",
    points: 214.5,
    position: 1,
    racesDetails: [
      {
        dates: {
          end: "2024-03-02T23:59:59.000Z",
          start: "2024-02-29T00:00:00.000Z"
        },
        featureRace: 12,
        flagSrc: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_22,w_34/v1/f2/global/flags/BH",
        name: "Sakhir",
        sprintRace: 3
      }
    ]
  }
...
```

### **2. getTeamStandings**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | if `racesDetails` property should be attached                             | `False`          |
| No              | `True` for **f3** standings and `False` for **f2** standings              | `False`          |

```js
[
  {
    code: "Invicta Racing",
    name: "Invicta Racing",
    points: 288.5,
    position: 1,
    racesDetails: [
      {
        dates: {
          end: "2024-03-02T23:59:59.000Z",
          start: "2024-02-29T00:00:00.000Z"
        },
        featureRace: 18,
        flagSrc: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_22,w_34/v1/f2/global/flags/BH",
        name: "Sakhir",
        sprintRace: 3
      }
    ]
  }
...
```

### **3. getCalendar**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | if `winners` property should be attached                                  | `False`          |
| No              | `True` for **f3** calendar and `False` for **f2** calendar                | `False`          |

```js
[
  {
    dates: {
      end: "2024-03-02T23:59:59.000Z",
      start: "2024-02-29T00:00:00.000Z"
    },
    name: "Sakhir",
    resultsLink: "https://www.fiaformula2.com/Results?raceid=1064",
    round: 1,
    winners: [
      {
        driverLink: "https://www.fiaformula2.com/Drivers/1227/Zane-Maloney",
        imgLink: "https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_169,w_300/v1/f2/global/drivers/2024/Official%20portraits/05_Maloney",
        name: "Z. Maloney",
        raceType: "Sprint"
      },
      {
        driverLink: "https://www.fiaformula2.com/Drivers/1227/Zane-Maloney",
        imgLink: "https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_169,w_300/v1/f2/global/drivers/2024/Official%20portraits/05_Maloney",
        name: "Z. Maloney",
        raceType: "Main Race"
      }
    ]
  }
...

```

### **4. getRaceResults**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | Number id of Race Event or event name for example `Sakhir`                | `Sakhir`         |
| No              | `True` for **f3** race results and `False` for **f2** race results        | `False`          |

```js
[
  {
    position: '1',
    number: 5,
    name: 'Z. Maloney',
    code: 'MAL',
    team: 'Rodin Motorsport',
    laps: 32,
    time: '1:02:46.435',
    gap: '-',
    int: '-',
    kph: '165.296',
    best: '1:46.813',
    lap: 23
  },
...
```

### **5. getSprintResults**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | Number id of Race Event or event name for example `Sakhir`                | `Sakhir`         |
| No              | `True` for **f3** sprint results and `False` for **f2** sprint results    | `False`          |

```js
= [
  {
    raceType: "SPRINT RACE 1",
    results: [
      {
        best: "1:22.445",
        code: "ZHO",
        gap: "-",
        int: "-",
        kph: "135.422",
        lap: 24,
        laps: 30,
        name: "G. Zhou",
        number: 3,
        position: "1",
        team: "UNI-Virtuosi",
        time: "44:21.272"
      }
    ]
  }
...
```

### **6. getQualiResults**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | Number id of Race Event or event name for example `Sakhir`                | `Sakhir`         |
| No              | `True` for **f3** quali results and `False` for **f2** quali results      | `False`          |

```js
[
  {
    qualiType: "QUALIFYING GROUP A",
    results: [
      {
        code: "VER",
        gap: "-",
        int: "-",
        kph: "147.794",
        lap_set_on: 2024-05-23T15:23:01.000Z,
        laps: "11",
        name: "R. Verschoor",
        number: 22,
        position: "1",
        team: "Trident",
        time: "1:21.283"
      }
    ]
  }
...
```

### **7. getPracticeResults**

| Needed Paramter | Paramter Description                                                       | Default Argument |
| --------------- | -------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current)  | current year     |
| No              | Number id of Race Event or event name for example `Sakhir`                 | `Sakhir`         |
| No              | `True` for **f3** practice results and `False` for **f2** practice results | `False`          |

```js
[
  {
    code: "HAD",
    gap: "-",
    int: "-",
    kph: "185.379",
    lap_set_on: 2024-02-29T12:43:32.000Z,
    laps: "18",
    name: "I. Hadjar",
    number: 20,
    position: "1",
    team: "Campos Racing",
    time: "1:45.099"
  }
...
```

### **8. getDriverLineup**

| Needed Paramter | Paramter Description                                                 | Default Argument |
| --------------- | -------------------------------------------------------------------- | ---------------- |
| No              | `True` for **f3** driver lineup and `False` for **f2** driver lineup | `False`          |

```js
{
  season: 2025,
  series: "Formula 2",
  teams: [
    {
      carLink: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_33,w_130/v1/f2/global/Cars/2025/01Invicta_025_1500k-00T",
      drivers: [
        {
          imgLink: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_65,w_100/v1/f2/global/drivers/2025/Official/01_Fornaroli",
          infoLink: "https://www.fiaformula2.com/Drivers/1256/Leonardo-Fornaroli",
          name: "L. Fornaroli",
          position: 1
        },
        {
          imgLink: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_65,w_100/v1/f2/global/drivers/2025/Official/02_Stanek",
          infoLink: "https://www.fiaformula2.com/Drivers/1232/Roman-Stanek",
          name: "R. Stanek",
          position: 2
        }
      ],
      infoLink: "https://www.fiaformula2.com/Teams/225/Invicta-Racing",
      logoLink: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_79,w_140/v1/f2/global/teams/logos/Team-Logo_VirtuosiRacing_2",
      name: "Invicta Racing"
    },
...
```

### **9. getHallOfFame**

| Needed Paramter | Paramter Description                                               | Default Argument |
| --------------- | ------------------------------------------------------------------ | ---------------- |
| No              | `True` for **f3** hall of fame and `False` for **f2** hall of fame | `False`          |

```js
[
  {
    imgLink: "https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_338,w_600/v1/f2/global/articles/2025/01_January/0U0A6630_Hq9SC6w9",
    name: "Isack Hadjar"
  },
  {
    champion: 2024,
    imgLink: "https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_338,w_600/v1/f2/global/articles/2025/01_January/IMG_2999_ERsMp9ho",
    name: "Gabriel Bortoleto"
  },
...
```

### **10. getTrackDetails**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| Yes             | Number id of Race Event or event name for example `Sakhir`                | `Sakhir`         |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | `True` for **f3** track details and `False` for **f2** track details      | `False`          |

In some cases `trackRecord`, `sprintInfo` `raceInfo` or `trackRecord.speed` properties are not defined. See [Zandvoort](https://www.fiaformula2.com/Results?raceid=1045)

```js
{
  circuitLength: "3.337 KM",
  firstRace: 2017,
  raceInfo: {
    laps: 42,
    length: "140.154 KM",
  },
  sprintInfo: {
    laps: 30,
    length: "100.11 KM",
  },
  trackMapImg: "https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_506,w_900/v1/f2/global/circuits/details/MC",
  trackName: "Circuit de Monaco",
  trackRecord: {
    driver: "Charles Leclerc",
    speed: "151.473 KM/H",
    team: "PREMA Racing",
    time: "1:19.309",
    year: 2017,
  }
}
```

## Usage

WARNING: Abusing this library may result in an IP ban from the host website.  
Please use with caution and try to limit the rate and amount of your requests if you value your access to fiaformula2.com or fiaformula3.com

## License

MIT License
