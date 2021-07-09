import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IState } from '../store';
import { useSelector } from 'react-redux';
import InfoCard from './InfoCard';

const useStyles = makeStyles({
  container: {
    width: "60%",
    display: "flex",
    overflow: 'hidden',
    flexWrap: "wrap"
  },
});
const getMetricMeasurements = (state: IState) => {
  const metricsMeasurements = state.metric.metricsMeasurements;
  return metricsMeasurements;
};

export default () => {
  const classes = useStyles();
  const metricsMeasurements = useSelector(getMetricMeasurements);
  return (
    <div className={classes.container}>
      {metricsMeasurements.map((item: any, index: number) => {
        return (<InfoCard data={item} key={index} />)
      })}
    </div>
  );
};
