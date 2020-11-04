corona-data-slovakia    
------------

Simple Javascript program that downloads and creates an SQL file from COVID-19 epidemic data in Slovakia. The data is
aggregated by **individual districts** which is not available in other data sets.


### Download the data

This will download raw data from the official PowerBI sheet. The results will be saved in `responses` directory.

```bash
yarn download
npm run download
```

### Transform the data

This will convert the PowerBI data to usable format (JSON ans SQL files). The results will be saved in `output` directory.

```bash
yarn transform
npm run transform
```


### Examples of the data files

SQL files will look like this:

```sql
INSERT INTO new_cases (timestamp, district, new_cases) VALUES 
  ('2020-03-08', 'Bratislava', 1),
  ('2020-03-11', 'Bratislava', 3),
  ('2020-03-12', 'Bratislava', 7),
  ('2020-03-13', 'Bratislava', 2),
  ('2020-03-14', 'Bratislava', 7),
  ('2020-03-15', 'Bratislava', 3),
  ('2020-03-17', 'Bratislava', 10);
```

JSON files will look like this.

```json
[
  {
    "timestamp": 1583625600,
    "new_cases": 1,
    "district": "Bratislava"
  },
  {
    "timestamp": 1583884800,
    "new_cases": 3,
    "district": "Bratislava"
  },
  {
    "timestamp": 1583971200,
    "new_cases": 7,
    "district": "Bratislava"
  }
]
```
