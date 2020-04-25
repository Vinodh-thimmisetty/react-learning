import React, { useState, useEffect } from 'react';
import './Covid.scss';
import moment from 'moment';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

function Summary({ summary }) {
  if (!summary.TotalConfirmed) return null;
  const lastUpdatedDate = moment(summary.Date).format('MMM DD YYYY');
  return (
    <div className="summary">
      <Grid container spacing={3} justify="center" className="summary-grid">
        <Grid item component={Card} className="infected">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={summary.TotalConfirmed}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">{lastUpdatedDate}</Typography>
            <Typography variant="body2">Total Active cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} className="recovered">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={summary.TotalRecovered}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">{lastUpdatedDate}</Typography>
            <Typography variant="body2">Total Recovery cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} className="deaths">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={summary.TotalDeaths}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">{lastUpdatedDate}</Typography>
            <Typography variant="body2">Total Death cases</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default Summary;
