import { INCREMENT, type IncrementAction } from 'actions/count';

export const DEFAULT_STATE = 0;

type CountAction = IncrementAction | { type: string };

const count = (state = DEFAULT_STATE, action: CountAction): number => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

export default count;
