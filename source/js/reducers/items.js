import { Map } from 'immutable';

import {
  LIST_ASYNC_ACTION_START,
  LIST_ASYNC_ACTION_ERROR,
  LIST_ASYNC_ACTION_SUCCESS,
  SET_PAGE_ACTION,
  SET_SORT_ACTION,
  ON_PRICE_FILTER_CHANGED,
  SET_FILTER_ACTION,
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
  priceFrom: '',
  priceTo: '',
  transitionName: '',
});

const actionsMap = {
  [LIST_ASYNC_ACTION_START]: (state, action) => {
    return state.merge({
      pending: action.pending,
    });
  },
  [LIST_ASYNC_ACTION_ERROR]: (state, action) => {
    return state.merge({
      pending: action.pending,
      asyncError: action.data,
    });
  },
  [LIST_ASYNC_ACTION_SUCCESS]: (state, action) => {
    return state.merge({
      pending: action.pending,
      list: action.data.items,
      total: action.data.total,
    });
  },
  [SET_PAGE_ACTION]: (state, action) => {
    return state.merge({
      page: action.page,
      transitionName: action.transitionName,
    });
  },
  [SET_SORT_ACTION]: (state, action) => {
    return state.merge({
      sortBy: action.sortBy,
      sortDir: action.sortDir,
      page: action.page,
      transitionName: action.transitionName,
    });
  },
  [ON_PRICE_FILTER_CHANGED]: (state, action) => {
    return state.merge({
      priceFrom: action.priceFrom,
      priceTo: action.priceTo,
    });
  },
  [SET_FILTER_ACTION]: (state, action) => {
    return state.merge({
      transitionName: action.transitionName,
      priceFrom: action.priceFrom,
      priceTo: action.priceTo,
      page: action.page,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
