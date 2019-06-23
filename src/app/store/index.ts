import { storeFreeze } from 'ngrx-store-freeze';
import * as fromTwitter from './twitter/twitter.reducer';
import { environment } from '../../environments/environment.prod';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export interface AppState {
  twitter: fromTwitter.TwitterState;
}

export const reducers: ActionReducerMap<AppState> = {
  twitter: fromTwitter.reducer
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [storeFreeze, fromTwitter.metaReducer] : [fromTwitter.metaReducer];
