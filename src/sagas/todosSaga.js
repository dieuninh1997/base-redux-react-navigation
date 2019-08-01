import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';

function loadTodo() {
  //
  return {};
}

function* fetchTodos() {
  try {
    const res = yield call(loadTodo);
    yield put({
      type: actionTypes.FETCH_TODOS_SUCCESS, payload: res.data,
    });
  } catch (error) {
    console.log('fetchTodo error: ', error);
    yield put({
      type: actionTypes.FETCH_TODOS_SUCCESS, payload: res.data,
    });
  }
}

export function* watchFetchTodos() {
  while (yield take(actionTypes.FETCH_TODOS)) {
    yield fork(fetchTodos);
  }
}
