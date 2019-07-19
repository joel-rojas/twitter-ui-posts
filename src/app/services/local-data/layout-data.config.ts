import { UserObj, TwitterUser, TwitterUserColumnData } from './../../store/twitter/twitter.model';
export interface LayoutData {
  defaultStatus: boolean;
  sortColumns: boolean;
  twitterColumns: TwitterColumnsStorage[];
  twitterTheme: string;
}
export interface TwitterColumnsStorage extends UserObj {
  value: number;
}
export interface LayoutDataSubject {
  isChanged: boolean;
  result: LayoutDataLike;
}
export interface TwitterColumnSubject extends UserObj {
  index: number;
  value: number;
}
export interface LayoutDataPropChange {
  key: string;
  data: LayoutDataLike;
}
export type LayoutDataLike = boolean|TwitterColumnSubject|string|number;
export type TwitterUserLike = TwitterUser|TwitterColumnsStorage|TwitterUserColumnData;
