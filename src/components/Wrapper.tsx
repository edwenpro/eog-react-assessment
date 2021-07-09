import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    padding: 24,
    gridArea: "content",
    overflowY: "auto",
    backgroundColor: "#fafafa",
    height: "100vh"
  },
});

const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

export default Wrapper;
