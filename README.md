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

### **1. getConstructorStandings**

| Needs Paramter ? | Paramter Description                                                      | Default Argument |
| ---------------- | ------------------------------------------------------------------------- | ---------------- |
| No               | The year from which you want to extract points table for (2017 - current) | current year     |
| No               | if `racesDetails` property should be attached                             | `False`          |

![driver standings](./readme/driver-standings.png)

## Usage

WARNING: Abusing this library may result in an IP ban from the host website.  
Please use with caution and try to limit the rate and amount of your requests if you value your access to fiaformula2.com

## License

MIT License
