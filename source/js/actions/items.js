import 'isomorphic-fetch';

export const LIST_ASYNC_ACTION_START = 'LIST_ASYNC_ACTION_START';
export const LIST_ASYNC_ACTION_ERROR = 'LIST_ASYNC_ACTION_ERROR';
export const LIST_ASYNC_ACTION_SUCCESS = 'LIST_ASYNC_ACTION_SUCCESS';
export const CHANGE_PAGE_ACTION = 'CHANGE_PAGE_ACTION';
export const SORT_LIST_ACTION = 'SORT_LIST_ACTION';
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

function changePage(page) {
  return {
    type: CHANGE_PAGE_ACTION,
    page
  };
}

function sortList(sortBy, sortDir) {
  return {
    type: SORT_LIST_ACTION,
    sortBy,
    sortDir,
  };
}

function setPriceFilter(priceFrom, priceTo) {
  return {
    type: SET_PRICE_FILTER_ACTION,
    priceFrom,
    priceTo,
  }
}

export function resetPriceFilter() {
  return {
    type: RESET_PRICE_FILTER_ACTION,
  }
}

export function getItemsAsync(params) {
  const { page, count, sortBy, sortDir, priceFrom, priceTo } = params;
  
  return function (dispatch) {
    dispatch(listAsyncStart());

    fetch(`/api/items?offset=${page * count}&count=${count}&sortBy=${sortBy}&sortDir=${sortDir}&priceFrom=${priceFrom}&priceTo=${priceTo}`)
      .then(response => response.json())
      .then(data => dispatch(listAsyncSuccess(data)))
      .catch(error => dispatch(listAsyncError(error)))
  };
}

export function changePageAsync(params) {
  const { page } = params;

  return (dispatch) => {
    dispatch(changePage(page));
    dispatch(getItemsAsync(params));
  };
}

export function sortListAsync(params) {
  const { sortBy, sortDir } = params;

  return (dispatch) => {
    dispatch(sortList(sortBy, sortDir));
    dispatch(getItemsAsync(params));
  };
}

export function setPriceFilterAsync(params) {
  const { priceFrom, priceTo } = params;

  return (dispatch) => {
    dispatch(setPriceFilter(priceFrom, priceTo));
    dispatch(getItemsAsync(params));
  }
}

// Update
