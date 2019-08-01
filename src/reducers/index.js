import { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL } from '../actions/types';

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
  case FETCH_TODOS_SUCCESS:
    break;
  case FETCH_TODOS_FAIL:
    break;
  default:
    return state;
  }
}
