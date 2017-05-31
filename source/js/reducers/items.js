import { Map } from 'immutable';

import {
  LIST_ASYNC_ACTION_START,
  LIST_ASYNC_ACTION_ERROR,
  LIST_ASYNC_ACTION_SUCCESS,
} from 'actions/items';

const initialState = Map({
  list: [],
  page: 0,
  count: 10,
  pending: false,
  asyncError: null,
});

const actionsMap = {
  // Async action
  [LIST_ASYNC_ACTION_START]: (state) => {
    return state.merge({
      pending: true,
    });
  },
  [LIST_ASYNC_ACTION_ERROR]: (state, action) => {
    return state.merge({
      pending: false,
      asyncError: action.data,
    });
  },
  [LIST_ASYNC_ACTION_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      list: action.data.items,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}