# F2-Scrapper

A Node.js web scraping tool for extracting data from F2 Website.

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

### **6. getQualiResults**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | Number id of Race Event or event name for example `Sakhir`                | `Sakhir`         |

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

### **7. getQualiResults**

| Needed Paramter | Paramter Description                                                      | Default Argument |
| --------------- | ------------------------------------------------------------------------- | ---------------- |
| No              | The year from which you want to extract points table for (2017 - current) | current year     |
| No              | Number id of Race Event or event name for example `Sakhir`                | `Sakhir`         |

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

### **7. getDriverLineup**

This function doesn’t take any parameters.

```js
[
  {
    carLink: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_33,w_130/v1/f2/global/Cars/2025/01Invicta_025_1500k-00T",
    drivers: [
      {
        imgLink: "https://www.fiaformula2.com/Drivers/1256/Leonardo-Fornaroli",  // Fixed placeholder
        infoLink: "https://www.fiaformula2.com/Drivers/1256/Leonardo-Fornaroli",
        name: "L. Fornaroli",
        position: 1
      },
      {
        imgLink: "https://www.fiaformula2.com/Drivers/1232/Roman-Stanek",  // Fixed placeholder
        infoLink: "https://www.fiaformula2.com/Drivers/1232/Roman-Stanek",
        name: "R. Stanek",
        position: 2
      }
    ],
    infoLink: "https://www.fiaformula2.com/Teams/225/Invicta-Racing",
    logoLink: "https://res.cloudinary.com/prod-f2f3/c_fill,dpr_1.0,f_auto,g_auto,h_79,w_140/v1/f2/global/teams/logos/Team-Logo_VirtuosiRacing_2",
    name: "Invicta Racing"
  }
...
```

## Usage

WARNING: Abusing this library may result in an IP ban from the host website.  
Please use with caution and try to limit the rate and amount of your requests if you value your access to fiaformula2.com

## License

MIT License
