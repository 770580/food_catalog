import { Map } from 'immutable';

import {
  LIST_ASYNC_ACTION_START,
  LIST_ASYNC_ACTION_ERROR,
  LIST_ASYNC_ACTION_SUCCESS,
  CHANGE_PAGE_ACTION,
  SORT_LIST_ACTION,
} from 'actions/items';

const initialState = Map({
  list: [],
  page: 0,
  count: 5,
  pending: false,
  asyncError: null,
  total: 0,
  sortBy: '',
  sortDir: '',
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
      total: action.data.total,
    });
  },
  [CHANGE_PAGE_ACTION]: (state, action) => {
    return state.merge({
      page: action.page,
    });
  },
  [SORT_LIST_ACTION]: (state, action) => {
    return state.merge({
      sortBy: action.sortBy,
      sortDir: action.sortDir,
      page: 0
    });
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}