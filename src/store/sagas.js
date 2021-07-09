import { spawn } from 'redux-saga/effects';
import MetricsSaga from '../Features/Metrics/saga';

export default function* root() {
  yield spawn(MetricsSaga);
}
