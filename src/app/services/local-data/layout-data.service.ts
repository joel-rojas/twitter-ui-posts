import { PostService } from './../ui/post.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LayoutData, LayoutDataLike, LayoutDataSubject,
  TwitterColumnsStorage, TwitterColumnSubject, LayoutDataPropChange } from './layout-data.config';
import { LoadingService } from '../ui/loading.service';
import { TwitterPostsModel } from '../../store/twitter/twitter.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutDataService {
  public readonly appThemes = {
    FIRST: 'theme1',
    SECOND: 'theme2',
    THIRD: 'theme3'
  };
  public readonly dataKey = 'twitterPostsApp';
  public readonly MAX_TWITTER_POSTS_ITEMS = this.twitterPostsModel.MAX_TWITTER_POSTS;
  public readonly MIN_TWITTER_POSTS_ITEMS = this.twitterPostsModel.MIN_TWITTER_POSTS;
  public readonly layoutDataKeys = {
    DEFAULT_STATUS: 'defaultStatus',
    SORT_COLUMNS: 'sortColumns',
    TWITTER_COLUMNS: 'twitterColumns',
    TWITTER_THEME: 'twitterTheme'
  };
  public defaultLocalData: LayoutData = {
    defaultStatus: true,
    sortColumns: false,
    twitterColumns: this.twitterPostsModel.twitterUsers.map(user => ({user, value: this.MAX_TWITTER_POSTS_ITEMS})),
    twitterTheme: this.appThemes.FIRST
  };
  public defaultStatusSubject$: BehaviorSubject<LayoutDataSubject>;
  public sortColumnsSubject$: BehaviorSubject<LayoutDataSubject>;
  public twitterColumnsSubject$: BehaviorSubject<LayoutDataSubject>[];
  public twitterThemeSubject$: BehaviorSubject<LayoutDataSubject>;
  constructor(
    private loadingService: LoadingService,
    private twitterPostsModel: TwitterPostsModel,
    private localStorage: LocalStorageService) {
      this.initSubjectsValues(this.defaultLocalData);
  }
  changeLayoutData(key: string, data: LayoutDataLike): LayoutData {
    const layoutData = this.getLayoutData();
    const {DEFAULT_STATUS, SORT_COLUMNS, TWITTER_COLUMNS, TWITTER_THEME} = this.layoutDataKeys;
    switch (key) {
      case TWITTER_THEME:
      case SORT_COLUMNS:
      case DEFAULT_STATUS: {
        layoutData[key] = data;
        break;
      }
      case TWITTER_COLUMNS: {
        layoutData[key] = layoutData[key].map((column: TwitterColumnSubject, idx: number, arr: TwitterColumnSubject[]) => {
          data = data as TwitterColumnSubject;
          if (data.index === idx) {
            return Object.assign(column, {value: data.value, user: data.user});
          }
          return {...column};
        });
        break;
      }
      default: break;
    }
    return layoutData;
  }
  getLayoutData(): LayoutData {
    return this.localStorage.getAppLocalStorageData(this.dataKey);
  }
  getLayoutDataAsObservable(): Observable<LayoutData> {
    return this.localStorage.layoutDataSubject$.asObservable();
  }
  getTwitterSingleColumnSubject(index: number): BehaviorSubject<LayoutDataSubject> {
    return this.twitterColumnsSubject$[index];
  }
  handleLoadingDataError(): Observable<void> {
    return of(this.loadingService.setLoadingValue(-1));
  }
  initLayoutLocalDataConfig(): Observable<any> {
    const layoutData: LayoutData = this.getLayoutData();
    if (layoutData == null) {
      return this.setDefaultLayoutData();
    }
    return this.setSavedLayoutData(layoutData);
  }
  initSubjectsValues(data: LayoutData): void {
    this.defaultStatusSubject$ = new BehaviorSubject<LayoutDataSubject>({isChanged: false, result: data.defaultStatus});
    this.sortColumnsSubject$ = new BehaviorSubject<LayoutDataSubject>({isChanged: false, result: data.sortColumns});
    this.twitterColumnsSubject$ = data.twitterColumns.map(
      (value: TwitterColumnsStorage, index: number) =>
        new BehaviorSubject<LayoutDataSubject>({isChanged: false, result: {index, user: value.user, value: value.value}}));
    this.twitterThemeSubject$ = new BehaviorSubject<LayoutDataSubject>({isChanged: false, result: data.twitterTheme});
  }
  saveDefaultStateSubjectValue(data: LayoutDataSubject) {
    this.defaultStatusSubject$.next(data);
  }
  saveSortColumnSubjectValue(data: LayoutDataSubject) {
    this.sortColumnsSubject$.next(data);
  }
  saveTwitterSingleColumnSubjectValue(data: LayoutDataSubject) {
    data.result = data.result as TwitterColumnSubject;
    this.twitterColumnsSubject$[data.result.index].next(data);
  }
  saveTwitterThemeColumnSubjectValue(data: LayoutDataSubject) {
    this.twitterThemeSubject$.next(data);
  }
  setDefaultLayoutData(): Observable<void> {
    return this.setLayoutData(this.dataKey, this.defaultLocalData);
  }
  setSingleLayoutDataProp(key: string, data: LayoutDataLike): Observable<void> {
    const layoutData = this.changeLayoutData(key, data);
    return this.setLayoutData(this.dataKey, layoutData);
  }
  setLayoutData(key: string, data: LayoutData): Observable<void> {
    return this.localStorage.setAppLocalStorageData(key, data).pipe(
      catchError(e => this.handleLoadingDataError())
    );
  }
  setMultipleLayoutDataProps(layoutProps: LayoutDataPropChange[]): Observable<void> {
    const newLayoutData = {};
    layoutProps.forEach(props => Object.assign(newLayoutData, this.changeLayoutData(props.key, props.data)));
    return this.setLayoutData(this.dataKey, newLayoutData as LayoutData);
  }
  setSavedLayoutData(layoutData: LayoutData): Observable<void> {
    this.initSubjectsValues(layoutData);
    return this.setLayoutData(this.dataKey, layoutData);
  }
}
