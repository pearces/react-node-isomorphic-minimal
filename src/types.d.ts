import type { compose } from 'redux';
import type { RootState } from 'reducers';

declare global {
  interface Window {
    __PRELOADED_STATE__?: RootState;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
