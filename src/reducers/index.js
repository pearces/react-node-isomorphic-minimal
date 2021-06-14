import { combineReducers } from 'redux';
import count from './count';
import date from './date';

export default combineReducers({
  count,
  date
});
