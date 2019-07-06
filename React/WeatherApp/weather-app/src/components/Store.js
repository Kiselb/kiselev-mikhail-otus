import { createStore } from 'redux';
import { citiesReducer } from '../reducers'
import { loadState, saveState } from '../localStorage'

const persistedState = loadState();

export const store = createStore(
  citiesReducer,
  persistedState
);

store.subscribe(() => {
  saveState({ cities: store.getState().cities });
});
