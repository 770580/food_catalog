import 'isomorphic-fetch';

export const LIST_ASYNC_ACTION_START = 'LIST_ASYNC_ACTION_START';
export const LIST_ASYNC_ACTION_ERROR = 'LIST_ASYNC_ACTION_ERROR';
export const LIST_ASYNC_ACTION_SUCCESS = 'LIST_ASYNC_ACTION_SUCCESS';
export const SET_PAGE_ACTION = 'SET_PAGE_ACTION';
export const SET_SORT_ACTION = 'SET_SORT_ACTION';
export const SET_PRICE_FILTER_ACTION = 'SET_PRICE_FILTER_ACTION';
export const RESET_PRICE_FILTER_ACTION = 'RESET_PRICE_FILTER_ACTION';

// Async action example

function listAsyncStart() {
  return {
    type: LIST_ASYNC_ACTION_START,
  };
}

function listAsyncSuccess(data) {
  return {
    type: LIST_ASYNC_ACTION_SUCCESS,
    data,
  };
}

function listAsyncError(error) {
  return {
    type: LIST_ASYNC_ACTION_ERROR,
    error,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE_ACTION,
    page,
  };
}

export function setSort(sortBy, sortDir) {
  return {
    type: SET_SORT_ACTION,
    sortBy,
    sortDir,
  };
}

export function setPriceFilter(priceFrom, priceTo) {
  return {
    type: SET_PRICE_FILTER_ACTION,
    priceFrom,
    priceTo,
  };
}

export function resetPriceFilter() {
  return {
    type: RESET_PRICE_FILTER_ACTION,
  };
}

export function getItemsAsync(params) {
  const { page, count, sortBy, sortDir, priceFrom, priceTo } = params;

  return function (dispatch) {
    dispatch(listAsyncStart());
    let fetchParams = '';
    fetchParams += (page >= 0 && count > 0) ? `&offset=${page * count}&count=${count}` : '';
    fetchParams += (sortBy && sortDir) ? `&sortBy=${sortBy}&sortDir=${sortDir}` : '';
    fetchParams += (priceFrom >= 0 && priceTo > 0) ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''; 

    fetch(`/api/items?${fetchParams}`)
      .then(response => response.json())
      .then(data => dispatch(listAsyncSuccess(data)))
      .catch(error => dispatch(listAsyncError(error)))
  };
}
