import { combineReducers } from 'redux';
import app from 'reducers/app';
import items from 'reducers/items';

export default combineReducers({
  app,
  items,
});
