import { combineReducers } from 'redux';
import count from './count';
import date from './date';

const reducer = combineReducers({
  count,
  date
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
