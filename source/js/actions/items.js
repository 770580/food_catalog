import 'isomorphic-fetch';

export const LIST_ASYNC_ACTION_START = 'LIST_ASYNC_ACTION_START';
export const LIST_ASYNC_ACTION_ERROR = 'LIST_ASYNC_ACTION_ERROR';
export const LIST_ASYNC_ACTION_SUCCESS = 'LIST_ASYNC_ACTION_SUCCESS';
export const CHANGE_PAGE_ACTION = 'CHANGE_PAGE_ACTION';

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

export function changePage(direction) {
  return {
    type: CHANGE_PAGE_ACTION,
    direction
  }
}

export function getItemsAsync(params) {
  const { page, count } = params;
  
  return function (dispatch) {
    dispatch(listAsyncStart());

    fetch(`/api/items?offset=${page * count}&count=${count}`)
      .then(response => response.json())
      .then(data => dispatch(listAsyncSuccess(data)))
      .catch(error => dispatch(listAsyncError(error)))
  };
}

// Update
