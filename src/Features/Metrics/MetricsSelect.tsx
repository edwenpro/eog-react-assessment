import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import Select from 'react-select';
import {
  Provider,
  createClient,
  useQuery,
  useSubscription,
  defaultExchanges,
  subscriptionExchange
} from 'urql';
import { SubscriptionClient } from "subscriptions-transport-ws";
import { IState } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import makeAnimated from 'react-select/animated';

const subscriptionClient = new SubscriptionClient("ws://react.eogresources.com/graphql", {});
const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [...defaultExchanges, subscriptionExchange({
    forwardSubscription: operation => subscriptionClient.request(operation)
  })]
});

const query_metric = `
query {
  getMetrics
}
`;
const query_multiple_measurements = `
query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at value metric unit __typename
    }
    __typename
  }
  __typename
}
`;
const metric_Subscription_Query = `
subscription{
  newMeasurement{
    metric
    value
    unit
    at
  }
}
`;
const useStyles = makeStyles({
  container: {
    width: "40%",
  },
});

export default () => {
  const classes = useStyles();
  return (
    <Provider value={client}>
      <div className={classes.container}>
        <SelectContainer />
      </div>
    </Provider>
  );
};
const FetchMetricList = () => {
  let query = query_metric;
  const dispatch = useDispatch();
  let [result] = useQuery({
    query,
    variables: {}
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.metricsApiErrorReceived, error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }
    const { getMetrics } = data;
    dispatch(actions.metricsDataRecevied(getMetrics));
  }, [dispatch, data, error, fetching]);
};

const metricListToDropDownFormat = (options: any[], getMetrics: any) => {

  if (getMetrics) {
    getMetrics.forEach((value: any) => {
      let obj = { label: value, value: value };
      options.push(obj);
    });
    return options;
  }
  else
    return [];
};
const getMetric = (state: IState) => {
  const getMetrics = state.metric.metrics;
  return getMetrics;
};

const FetchMultipleMeasurements = (selectedValues: any) => {
  const dispatch = useDispatch();
  let [result] = useQuery({
    query: query_multiple_measurements,
    variables: { input: selectedValues }
  });
  const { data, error, fetching } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.metricsMeasurementsApiErrorReceived, error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }
    const { getMultipleMeasurements } = data;
    dispatch(actions.metricsMeasurementsApiDataReceived(getMultipleMeasurements));
  }, [dispatch, data, error, fetching]);
};

const FetchNewMeasurementData = () => {
  const dispatch = useDispatch();
  const [result] = useSubscription({
    query: metric_Subscription_Query
  });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.newMetricsMeasurementsApiErrorReceived, error });
      return;
    }
    if (!data) {
      return;
    }
    const { newMeasurement } = data;
    dispatch(actions.newMetricsMeasurementsApiDataReceived(newMeasurement));
  }, [data, error, dispatch]);
};
const SelectContainer = () => {
  const animatedComponents = makeAnimated();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  FetchMetricList(); ///get the list of metrics for dropdown
  FetchMultipleMeasurements(selectedValues);
  FetchNewMeasurementData();
  const getMetrics = useSelector(getMetric);
  let options: any = [];
  options = metricListToDropDownFormat(options, getMetrics);
  const handleInputChange = (newVal: any) => {
    setSelectedOptions(newVal);
    let newItems: any = [];
    let currentTimeStamp = Date.now();
    for (let i = 0; i < newVal.length; i++) {
      let item = newVal[i];
      newItems.push({ metricName: item.value, after: currentTimeStamp - 1800000, before: currentTimeStamp });
    }
    setSelectedValues(newItems);
  }


  return (
    <Select
      options={options}
      value={selectedOptions}
      components={animatedComponents}
      isMulti
      closeMenuOnSelect={false}
      onChange={handleInputChange} />
  )
}
