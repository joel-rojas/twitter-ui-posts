import { TwitterColumnSubject } from './../../services/local-data/layout-data.config';
import { Action } from '@ngrx/store';
import { TwitterPosts } from './twitter.model';
import { TwitterColumnsStorage } from 'src/app/services/local-data/layout-data.config';

export enum TwitterActionTypes {
  LoadTwitterPosts = '[Twitter] Load Twitters Posts',
  TwitterPostsLoaded = '[Twitter] Twitter Posts Loaded',
  SwitchTwitterPosts = '[Twitter] Switch Twitter Posts',
  ModifyTwitterPostsQty = '[Twitter] Modify Twitter Posts Quantity',
  TwitterPostsLoadingError = '[Twitter] Error Loading Twitter Posts',
  ReOrderTwitterPosts = '[Twitter] Reorder Twitter Posts Columns',
  NoOpTwitterPosts = '[Twitter] No Operation on Twitter Posts',
  ResetTwitterPosts = '[Twitter] Reset Twitter Posts'
}

export class LoadTwitterPosts implements Action {
  readonly type = TwitterActionTypes.LoadTwitterPosts;
}

export class ResetTwitterPosts implements Action {
  readonly type = TwitterActionTypes.ResetTwitterPosts;
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
  constructor(public payload: TwitterColumnSubject) {}
}

export class TwitterPostsLoadingError implements Action {
  readonly type = TwitterActionTypes.TwitterPostsLoadingError;
}

export class ReOrderTwitterPosts implements Action {
  readonly type = TwitterActionTypes.ReOrderTwitterPosts;
  constructor(public payload: {twitterColumns: TwitterColumnsStorage[]}) {}
}

export class NoOpTwitterPosts implements Action {
  readonly type = TwitterActionTypes.NoOpTwitterPosts;
}

export type TwitterActions =
LoadTwitterPosts
 | TwitterPostsLoaded
 | SwitchTwitterPosts
 | ModifyTwitterPostsQty
 | TwitterPostsLoadingError
 | ReOrderTwitterPosts
 | NoOpTwitterPosts
 | ResetTwitterPosts;
