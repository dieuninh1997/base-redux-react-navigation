import { all } from 'redux-saga/effects';
import { watchFetchTodos } from './todosSaga';

export default function* rootSaga() {
  yield all([
    watchFetchTodos,

  ]);
}
