import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px 1px rgba(0, 0, 0, 0.12)",
    margin: "1rem",
    paddingBottom: 24,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    width: "auto",
    minWidth: 250,
    borderRadius: 10
  },
  name: {
    fontSize: "1.25rem",
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
    margin: 0
  },
  value: {
    fontSize: "3rem",
    lineHeight: 1.04,
    letterSpacing: 0,
    margin: 0
  },
  valueContainer: {
    display: 'flex'
  }
});
export default (props: any) => {
  const classes = useStyles();
  const { data } = props
  return (
    <div className={classes.container}>
      <h6 className={classes.name}>{data.metric}</h6>
      <div className={classes.valueContainer}>
        <h3 className={classes.value}>{data.measurements[0].value}</h3>
        <h6 className={classes.name}>{data.measurements[0].unit}</h6>
      </div>
    </div>
  );
};
