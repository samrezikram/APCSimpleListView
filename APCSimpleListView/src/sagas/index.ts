import { all } from 'redux-saga/effects';
import { rootAppSaga } from './app.saga';

export function* rootSaga() {
  yield all([
    rootAppSaga(),
  ]);
}
