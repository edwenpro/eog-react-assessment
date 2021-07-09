import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsMeasurements = {
  getMetrics: []
  metricsMeasurements: []
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metrics: [],
  metricsMeasurements: [] as any
};

const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<MetricsMeasurements>) => {
      state.metrics = Object.assign([], action.payload);
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    metricsMeasurementsApiDataReceived: (state, action: PayloadAction<MetricsMeasurements>) => {
      state.metricsMeasurements = Object.assign([], action.payload);
    },
    metricsMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    newMetricsMeasurementsApiDataReceived: (state, action: PayloadAction<MetricsMeasurements>) => {
      for (let i = 0; i < state.metricsMeasurements.length; i++) {
        let newMeasurement: any = action.payload;
        if (state.metricsMeasurements[i].metric === newMeasurement.metric) {
          state.metricsMeasurements[i].measurements.push(newMeasurement);
          state.metricsMeasurements[i].measurements.shift();
        }
      }
    },
    newMetricsMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
