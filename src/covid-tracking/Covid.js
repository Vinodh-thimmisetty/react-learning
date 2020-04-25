import React, { useState, useEffect } from 'react';
import Summary from './Summary';
import Country from './Country';
import Chart from './Chart';
import './Covid.scss';

import axios from 'axios';
import { COVID_SUMMARY_API } from './Constants';

function Covid() {
  const [country, setCountry] = useState('');
  const [summary, setSummary] = useState({});

  useEffect(() => {
    if (!country) fetchData();
    else fetchCountryData(country);
  }, [country]);

  const fetchData = async () => {
    const response = await axios.get(COVID_SUMMARY_API);
    const globalSummary = response.data.Global;
    console.log('Global Statistics : ', globalSummary);
    setSummary(globalSummary);
  };

  const fetchCountryData = async () => {
    const response = await axios.get(COVID_SUMMARY_API);
    const countrySummary = response.data.Countries.filter(
      (cName) => cName.Slug === country
    )[0];
    console.log(country, ' Statistics : ', countrySummary);
    setSummary(countrySummary);
  };

  function onCountryChange(value) {
    console.log('Selected Country :: ', value);
    setCountry(value);
  }
  return (
    <div className="container">
      <Summary summary={summary} />
      <Country onCountryChange={onCountryChange} />
      <Chart country={country} summary={summary} />
    </div>
  );
}

export default React.memo(Covid);
