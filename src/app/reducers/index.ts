import { createReducer, on } from '@ngrx/store';
import { goToDetails } from '../data.actions';

export const initialState = 0;

const _detailsReducer = createReducer(initialState,
  on(goToDetails, state => state + 1)
);


export function detailsReducer(state, action) {
  console.log('detailsReducer')
  return _detailsReducer(state, action);
}