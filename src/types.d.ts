import type { compose } from 'redux';

declare global {
  interface Window {
    __PRELOADED_STATE__?: unknown;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: compose | undefined;
  }
}
