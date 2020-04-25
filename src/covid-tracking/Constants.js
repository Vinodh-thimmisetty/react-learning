export const COVID_API = `https://api.covid19api.com`;
export const COVID_SUMMARY_API = `${COVID_API}/summary`;
export const COUNTRY_LIST_API = `${COVID_API}/countries`;

export const COUNTRY_NAME = 'india',
  FROM_DATE = new Date('01/05/2020').toISOString(),
  TO_DATE = new Date().toISOString();

export const timeSeriesApi = (
  countryName = COUNTRY_NAME,
  fromDate = FROM_DATE,
  toDate = TO_DATE
) => `${COVID_API}/country/${countryName}?from=${fromDate}&to=${toDate}`;

export const countrySummaryApi = (country) =>
  `${COVID_API}/total/country/${country}`;
