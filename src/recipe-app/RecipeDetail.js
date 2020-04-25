import React from 'react';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    minWidth: 350,
    margin: 10,
    backgroundColor: '#f1bfe7',
  },
  header: {
    maxWidth: 211,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: 2,
  },
  avatar: {
    backgroundColor: red[500],
    fontSize: 10,
  },
  cardContent: {
    textAlign: 'start',
  },
  cardActions: {
    position: 'relative',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const RecipeDetail = ({ title, preparationSteps, calories, imgSrc }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="calories" className={classes.avatar}>
            {calories.toFixed(2)}
          </Avatar>
        }
        title={title}
      />
      <CardMedia className={classes.media} image={imgSrc} title={title} />
      <CardContent>
        {preparationSteps.map((step, idx) => (
          <Typography
            key={idx}
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.cardContent}>
            <span>
              <strong> STEP {idx + 1} : </strong>
            </span>
            {step}
          </Typography>
        ))}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label="add to favorites">
          <Icon.Gift />
        </IconButton>
        <IconButton aria-label="share">
          <Icon.Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default RecipeDetail;
