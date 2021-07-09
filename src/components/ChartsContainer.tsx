import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IState } from '../store';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import moment from 'moment';
const useStyles = makeStyles({
  container: {
    width: "100%",
    marginTop: 30
  },
  yAxisLabel: {
    textAlign: 'end',
    color: 'red',
    margin: 20
  }
});
const formatXAxis = (tickItem: any) => {
  return moment(parseInt(tickItem)).format("HH:mm");
}

const colors: string[] = [
  "#123456",
  "#654321",
  "#c0e300",
  "#00abcd",
  "#00cc23",
  "#aa00bb",
];

const getMetricMeasurements = (state: IState) => {
  const metricsMeasurements = state.metric.metricsMeasurements;
  return metricsMeasurements;
};

const measurementDataToChartFormat = (data_list: any[], metricsMeasurements: any) => {
  let data = metricsMeasurements;
  if (!data || data.length === 0) {
    return [];
  }
  let metric_length = data[0].measurements.length;
  let data_chart_format = [];

  for (let index = 0; index < metric_length; index++) {
    let obj: any = {};
    for (let j = 0; j < data.length; j++) {
      obj[data[j].measurements[index].metric] =
        data[j].measurements[index].value;
      obj["at"] = data[j].measurements[index].at;
    }
    data_chart_format.push(obj);
  }
  return data_chart_format;
};

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props
  if (active && payload && payload.length) {
    return (
      <div>
        <p>{moment(parseInt(label)).format("lll")}</p>
        {payload.map((item: any, index: number) => {
          return <p key={index}>{item.name + ": " + item.value}</p>
        })}
      </div>
    );
  }

  return null;
};

export default () => {
  const classes = useStyles();
  const metricsMeasurements = useSelector(getMetricMeasurements);
  let data_list: any[] = [];
  if (metricsMeasurements.length !== 0) {
    data_list = measurementDataToChartFormat(
      data_list,
      metricsMeasurements
    );
  }

  return (
    <div className={classes.container}>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={data_list}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {metricsMeasurements && metricsMeasurements.length > 0 && <XAxis
            dataKey="at"
            scale="linear"
            allowDataOverflow={true}
            tickFormatter={formatXAxis}
          />}
          <Tooltip content={<CustomTooltip />} />
          {metricsMeasurements && metricsMeasurements.length > 0 &&
            metricsMeasurements.map((item: any, index: number) => {
              return (
                <YAxis
                  key={index}
                  domain={["auto", "auto"]}
                  scale="linear"
                  padding={{ top: 10, bottom: 10 }}
                  yAxisId={`${item.metric}`}
                  label={{
                    value: item.measurements[0].unit,
                    angle: -90,
                    offset: 15,
                    position: 'insideTopLeft',
                    className: classes.yAxisLabel
                  }}
                  tickCount={10}
                />
              );
            })}
          <Legend />

          {metricsMeasurements && metricsMeasurements.length > 0 &&
            metricsMeasurements.map((item: any, index: number) => {
              return (
                <Line
                  type="monotone"
                  key={`${item.metric}`}
                  dataKey={`${item.metric}`}
                  yAxisId={`${item.metric}`}
                  strokeOpacity="1"
                  stroke={colors[index]}
                  activeDot={{ r: 8 }}
                  isAnimationActive={false}
                  dot={false}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
