import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReducer from './twitter.reducer';
import * as fromModel from './twitter.model';


function getTwitterPostsByName(users: fromModel.TwitterUser[], name: string) {
  return users.find(data => data.user === name);
}

function getTwitterUser(name: string) {
  return (users: fromModel.TwitterUser[]) => {
    return users.length > 0 ? getTwitterPostsByName(users, name) : null;
  };
}

export const twitterPostState = createFeatureSelector<fromReducer.TwitterState>('twitter');

export const selectTwitterPostsIds = createSelector(
  twitterPostState,
  fromReducer.selectIds
);

export const selectTwitterPostsEntities = createSelector(
  twitterPostState,
  fromReducer.selectEntities
);

export const selectAllTwitterPosts = createSelector(
  twitterPostState,
  fromReducer.selectAll
);

export const selectTotalTwitterPosts = createSelector(
  twitterPostState,
  fromReducer.selectTotal
);

export const selectTwitterPostsByUser = createSelector(
  twitterPostState,
  (twitterPostsState) => {
    return twitterPostsState.users ? twitterPostsState.users : [];
  }
);

export const selectMakeSchoolTwitterUser = createSelector(
  selectTwitterPostsByUser,
  getTwitterUser(fromModel.TwitterUsers.MakeSchool)
);

export const selectNewsYCombinatorTwitterUser = createSelector(
  selectTwitterPostsByUser,
  getTwitterUser(fromModel.TwitterUsers.NewsYCombinator)
);

export const selectYCombinatorTwitterUser = createSelector(
  selectTwitterPostsByUser,
  getTwitterUser(fromModel.TwitterUsers.YCombinator)
);
