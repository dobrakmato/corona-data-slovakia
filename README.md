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
