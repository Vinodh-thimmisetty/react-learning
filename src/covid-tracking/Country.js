import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { COUNTRY_LIST_API } from './Constants';
import './Covid.scss';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Country({ onCountryChange }) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const { data: countries } = await axios.get(COUNTRY_LIST_API);
    // console.table(countries);
    setCountries(
      countries.sort((a, b) => {
        let first = a.Country;
        let next = b.Country;
        if (first > next) return 1;
        else if (first < next) return -1;
        else return 0;
      })
    );
  };

  const countryChange = (e) => {
    const selectedCountry = e.target.value;
    onCountryChange(selectedCountry);
    setCountry(selectedCountry);
  };
  if (!countries) return null;
  return (
    <div className="country">
      <FormControl className="country-list" style={{ minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          onChange={(e) => countryChange(e)}>
          {countries.map((ctry, indx) => (
            <MenuItem value={ctry.Slug} key={indx}>
              {ctry.Country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Country;
