import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TwitterPosts } from './twitter.model';

export enum TwitterActionTypes {
  LoadTwitterPosts = '[Twitter] Load Twitters Posts',
  TwitterPostsLoaded = '[Twitter] Twitter Posts Loaded',
  SwitchTwitterPosts = '[Twitter] Switch Twitter Posts',
  ModifyTwitterPostsQty = '[Twitter] Modify Twitter Posts Quantity',
  TwitterPostsLoadingError = '[Twitter] Error Loading Twitter Posts',
  AddTwitter = '[Twitter] Add Twitter',
  UpsertTwitter = '[Twitter] Upsert Twitter',
  AddTwitters = '[Twitter] Add Twitters',
  UpsertTwitters = '[Twitter] Upsert Twitters',
  UpdateTwitter = '[Twitter] Update Twitter',
  UpdateTwitters = '[Twitter] Update Twitters',
  DeleteTwitter = '[Twitter] Delete Twitter',
  DeleteTwitters = '[Twitter] Delete Twitters',
  ClearTwitters = '[Twitter] Clear Twitters'
}

export class LoadTwitterPosts implements Action {
  readonly type = TwitterActionTypes.LoadTwitterPosts;
}

export class TwitterPostsLoaded implements Action {
  readonly type = TwitterActionTypes.TwitterPostsLoaded;
  constructor(public payload: { twitterPosts: TwitterPosts[] }) {}
}

export class SwitchTwitterPosts implements Action {
  readonly type = TwitterActionTypes.SwitchTwitterPosts;
  constructor(public payload: { previousIndex: number, currentIndex: number }) {}
}

export class ModifyTwitterPostsQty implements Action {
  readonly type = TwitterActionTypes.ModifyTwitterPostsQty;
  constructor(public payload: { index: number, value: number }) {}
}

export class TwitterPostsLoadingError implements Action {
  readonly type = TwitterActionTypes.TwitterPostsLoadingError;
}

export class AddTwitter implements Action {
  readonly type = TwitterActionTypes.AddTwitter;

  constructor(public payload: { twitterPost: TwitterPosts }) {}
}

export class UpsertTwitter implements Action {
  readonly type = TwitterActionTypes.UpsertTwitter;

  constructor(public payload: { twitterPost: TwitterPosts }) {}
}

export class AddTwitters implements Action {
  readonly type = TwitterActionTypes.AddTwitters;

  constructor(public payload: { twitterPosts: TwitterPosts[] }) {}
}

export class UpsertTwitters implements Action {
  readonly type = TwitterActionTypes.UpsertTwitters;

  constructor(public payload: { twitterPosts: TwitterPosts[] }) {}
}

export class UpdateTwitter implements Action {
  readonly type = TwitterActionTypes.UpdateTwitter;

  constructor(public payload: { twitter: Update<TwitterPosts> }) {}
}

export class UpdateTwitters implements Action {
  readonly type = TwitterActionTypes.UpdateTwitters;

  constructor(public payload: { twitterPosts: Update<TwitterPosts>[] }) {}
}

export class DeleteTwitter implements Action {
  readonly type = TwitterActionTypes.DeleteTwitter;

  constructor(public payload: { id: string }) {}
}

export class DeleteTwitters implements Action {
  readonly type = TwitterActionTypes.DeleteTwitters;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTwitters implements Action {
  readonly type = TwitterActionTypes.ClearTwitters;
}

export type TwitterActions =
LoadTwitterPosts
 | TwitterPostsLoaded
 | SwitchTwitterPosts
 | ModifyTwitterPostsQty
 | TwitterPostsLoadingError
 | AddTwitter
 | UpsertTwitter
 | AddTwitters
 | UpsertTwitters
 | UpdateTwitter
 | UpdateTwitters
 | DeleteTwitter
 | DeleteTwitters
 | ClearTwitters;
