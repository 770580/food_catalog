import 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export const LIST_ASYNC_ACTION_START = 'LIST_ASYNC_ACTION_START';
export const LIST_ASYNC_ACTION_ERROR = 'LIST_ASYNC_ACTION_ERROR';
export const LIST_ASYNC_ACTION_SUCCESS = 'LIST_ASYNC_ACTION_SUCCESS';
export const SET_PAGE_ACTION = 'SET_PAGE_ACTION';
export const SET_SORT_ACTION = 'SET_SORT_ACTION';
export const ON_PRICE_FILTER_CHANGED = 'ON_PRICE_FILTER_CHANGED';
export const SET_FILTER_ACTION = 'SET_FILTER_ACTION';

function listAsyncStart() {
  return {
    type: LIST_ASYNC_ACTION_START,
    pending: true,
  };
}

function listAsyncSuccess(data) {
  return {
    type: LIST_ASYNC_ACTION_SUCCESS,
    data,
    pending: false,
  };
}

function listAsyncError(error) {
  return {
    type: LIST_ASYNC_ACTION_ERROR,
    error,
    pending: false,
  };
}

export function getItemsAsync() {
  return (dispatch, getState) => {
    const state = getState().items;
    const page = state.get('page');
    const count = state.get('count');
    const sortBy = state.get('sortBy');
    const sortDir = state.get('sortDir');
    const priceFrom = state.get('priceFrom');
    const priceTo = state.get('priceTo');

    dispatch(listAsyncStart());
    let fetchParams = '';
    fetchParams += (page >= 0 && count > 0) ? `&offset=${page * count}&count=${count}` : '';
    fetchParams += (sortBy && sortDir) ? `&sortBy=${sortBy}&sortDir=${sortDir}` : '';
    fetchParams += (priceFrom >= 0 && priceTo > 0) ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : '';

    fetch(`/api/items?${fetchParams}`)
      .then(response => response.json())
      .then(data => dispatch(listAsyncSuccess(data)))
      .catch(error => dispatch(listAsyncError(error)));
  };
}

function persistPage(page) {
  const location = browserHistory.getCurrentLocation();
  location.query.page = page + 1;
  browserHistory.push(location);
  localStorage.setItem('page', page);
}

export function setPage(page) {
  return (dispatch, getState) => {
    persistPage(page);

    const prevPage = getState().items.get('page');
    if (prevPage === page) {
      return;
    }

    const transitionName = prevPage === null ? '' :
      (prevPage > page ? 'ListNextPage' : 'ListPrevPage');

    dispatch({
      type: SET_PAGE_ACTION,
      page,
      transitionName,
    });
    dispatch(getItemsAsync());
  };
}

export function setSort(sortBy, sortDir) {
  return (dispatch) => {
    persistPage(0);
    dispatch({
      type: SET_SORT_ACTION,
      sortBy,
      sortDir,
      page: 0,
      transitionName: '',
    });
    dispatch(getItemsAsync());
  };
}

export function onPriceFilterInputChanged(priceFrom, priceTo) {
  return {
    type: ON_PRICE_FILTER_CHANGED,
    priceFrom,
    priceTo,
  };
}

export function setFilter(priceFrom, priceTo) {
  return (dispatch) => {
    persistPage(0);
    dispatch({
      type: SET_FILTER_ACTION,
      priceFrom,
      priceTo,
      page: 0,
      transitionName: '',
    });
    dispatch(getItemsAsync());
  };
}
