import { AppState } from './../index';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TwitterPosts, TwitterUser, TwitterPostsModel } from './twitter.model';
import { TwitterActions, TwitterActionTypes } from './twitter.actions';
import { ActionReducer } from '@ngrx/store';

export interface TwitterState extends EntityState<TwitterPosts> {
  // additional entities state properties
  users: TwitterUser[];
}

export const emptyTwitterPosts: TwitterState = {
  ids: [],
  entities: null,
  users: []
};

export const adapter: EntityAdapter<TwitterPosts> = createEntityAdapter<TwitterPosts>();

export const initialState: TwitterState = adapter.getInitialState(emptyTwitterPosts);

export function reducer(
  state = initialState,
  action: TwitterActions
): TwitterState {
  switch (action.type) {

    case TwitterActionTypes.TwitterPostsLoaded: {
      const twitterPostsModel = new TwitterPostsModel();
      const {twitterPosts} = action.payload;
      const filteredByUser = twitterPostsModel.filterTwitterPostsByUser(twitterPosts);
      const users = twitterPostsModel.getTwitterUsersByTwitterPosts(filteredByUser);
      return Object.assign({}, adapter.addAll(twitterPosts, state), {users});
    }

    case TwitterActionTypes.SwitchTwitterPosts: {
      const twitterPostsModel = new TwitterPostsModel();
      const {previousIndex, currentIndex} = action.payload;
      const {users} = state;
      const newUsers = twitterPostsModel.switchTwitterPostsByUser(users, previousIndex, currentIndex);
      return {...state, users: newUsers};
    }

    case TwitterActionTypes.ModifyTwitterPostsQty: {
      const twitterPostsModel = new TwitterPostsModel();
      const {user, value} = action.payload;
      const {users, entities} = state;
      const newUsers = twitterPostsModel.getClonedUsersData(users);
      const userPosts = twitterPostsModel.getTwitterPostsByUser(user, entities);
      const modifiedUserPosts = twitterPostsModel.changeTwitterPostsQuantityByUser(newUsers, userPosts, user, value);
      return {...state, users: modifiedUserPosts};
    }

    case TwitterActionTypes.ReOrderTwitterPosts: {
      const twitterPostsModel = new TwitterPostsModel();
      const {twitterColumns} = action.payload;
      const {users} = state;
      const newUsers = twitterPostsModel.getClonedUsersData(users);
      const reOrderedUsers = twitterPostsModel.reorderTwitterPostsByLocalStorage(twitterColumns, newUsers);
      return {...state, users: reOrderedUsers};
    }

    default: {
      return state;
    }
  }
}

export function metaReducer(appReducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: TwitterActions) => {
    if (action.type === TwitterActionTypes.ResetTwitterPosts) {
      const twitterPostsModel = new TwitterPostsModel();
      const {users, entities} = state.twitter;
      const newUsers = twitterPostsModel.getTwitterPostsSortedByDefault(users, entities);
      return {
        ...state,
        twitter: {
          ...state.twitter, users: newUsers
        }
      };
    }
    return appReducer(state, action);
  };
}


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
