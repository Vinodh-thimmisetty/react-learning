import React, { useState, useEffect } from 'react';
import './Covid.scss';
import { timeSeriesApi } from './Constants';
import axios from 'axios';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Line, Bar } from 'react-chartjs-2';

function Chart({ country }) {
  const [countryTimeSeries, setCountryTimeSeries] = useState([]);
  const isChart = true;
  useEffect(() => {
    if (country) fetchDailyData();
  }, [country]);

  const fetchDailyData = async () => {
    const { data: timeSeriesData } = await axios.get(timeSeriesApi(country));
    console.table(timeSeriesData);
    // console.table([{ Confirmed, Recovered, Deaths, timeSeriesDate }]);
    setCountryTimeSeries(timeSeriesData);
  };
  if (!country || !countryTimeSeries) return null;

  const LineChart = (
    <div className="charts">
      <h2>Chart Details</h2>
      <Line
        data={{
          labels: countryTimeSeries.map((d) =>
            new Date(d.Date).toLocaleDateString()
          ),
          datasets: [
            {
              data: countryTimeSeries.map((d) => d.Confirmed),
              label: 'Infected',
              borderColor: '#33f',
              fill: true,
            },
            {
              data: countryTimeSeries.map((d) => d.Deaths),
              label: 'Deaths',
              borderColor: 'red',
              fill: true,
            },
          ],
        }}
      />
    </div>
  );

  return (
    <div className="charts">
      {isChart === true ? (
        LineChart
      ) : (
        <TableContainer component={Paper} className="timeseries-table">
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Confirmed</TableCell>
                <TableCell align="right">Recovered</TableCell>
                <TableCell align="right">Deaths</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countryTimeSeries.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {new Date(row.Date).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{row.Country}</TableCell>
                  <TableCell align="right">{row.Confirmed}</TableCell>
                  <TableCell align="right">{row.Recovered}</TableCell>
                  <TableCell align="right">{row.Deaths}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Chart;
