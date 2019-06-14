export interface LayoutData {
  defaultStatus: boolean;
  sortColumns: boolean;
  twitterColumns: TwitterColumnsStorage[];
  twitterTheme: string;
}
export interface TwitterColumnsStorage {
  value: number;
  user: string;
}
export interface LayoutDataSubject {
  isChanged: boolean;
  result: LayoutDataLike;
}
export interface TwitterColumnSubject {
  index: number;
  user: string;
  value: number;
}
export interface LayoutDataPropChange {
  key: string;
  data: LayoutDataLike;
}
export type LayoutDataLike = boolean|TwitterColumnSubject|string|number;


