import { INCREMENT } from 'actions/count';

export const DEFAULT_STATE = 0;

// eslint-disable-next-line default-param-last
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};
