import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { zip, Observable, combineLatest, BehaviorSubject, EMPTY,  } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { AppState } from './../../store/index';
import { selectTwitterPostsByUser,
  selectMakeSchoolTwitterUser,
  selectNewsYCombinatorTwitterUser,
  selectYCombinatorTwitterUser
} from './../../store/twitter/twitter.selectors';
import { TwitterUser, TwitterUserColumnData, UserObj, TwitterUsers } from './../../store/twitter/twitter.model';
import { LayoutDataService } from './../local-data/layout-data.service';
import { LayoutDataLike,
  LayoutData,
  TwitterColumnsStorage,
  TwitterColumnSubject,
  TwitterUserLike } from './../local-data/layout-data.config';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public readonly defaultUsersSelectorsOrder: TwitterUserColumnData[] =
    this.layoutDataService.defaultLocalData.twitterColumns.map(data => {
      const {user} = data;
      if (user === TwitterUsers.MakeSchool) {
        return {user, fn: selectMakeSchoolTwitterUser};
      } else if (user === TwitterUsers.NewsYCombinator) {
        return {user, fn: selectNewsYCombinatorTwitterUser};
      }
      return {user, fn: selectYCombinatorTwitterUser};
    });
  public filledLayoutData$: Observable<LayoutData>;
  public filledUsersPosts$: Observable<TwitterUser[]>;
  public firstUserPosts$: Observable<TwitterUser>;
  public layoutData$: Observable<LayoutData>;
  public secondUserPosts$: Observable<TwitterUser>;
  public thirdUserPosts$: Observable<TwitterUser>;
  public twitterUserColumnData$: BehaviorSubject<TwitterUserColumnData[]> = new BehaviorSubject(null);
  public usersPosts$: Observable<TwitterUser[]>;
  public userColumnData: TwitterUserColumnData[];
  constructor(private store: Store<AppState>, private layoutDataService: LayoutDataService) {
    this.setDefaultUserSelectorsOrder();
    this.layoutData$ = this.layoutDataService.getLayoutDataAsSubject();
    this.filledLayoutData$ = this.layoutData$.pipe(filter(dataStorage => dataStorage !== null));
    this.usersPosts$ = this.store.pipe(select(selectTwitterPostsByUser));
    this.filledUsersPosts$ = this.usersPosts$.pipe(filter((twitterUsers) => twitterUsers.length > 0), take(1));
  }
  changeTwitterColumnsData(data: {previousIndex: number, currentIndex: number}): Observable<any> {
    const {currentIndex, previousIndex} = data;
    if (currentIndex === previousIndex) {
      return EMPTY;
    }
    switch (currentIndex) {
      case 0: {
        return this.switchColumnData(currentIndex, previousIndex, 0, 1, 2);
      }
      case 1: {
        return this.switchColumnData(currentIndex, previousIndex, 1, 0, 2);
      }
      case 2: {
        return this.switchColumnData(currentIndex, previousIndex, 2, 0, 1);
      }
    }
  }
  changeAppLocalStorageData(setA: TwitterUserLike[], setB: TwitterUserLike[], isDefault: boolean) {
    const localStorageData = JSON.parse(JSON.stringify(this.layoutDataService.getLayoutData()));
    const newTwitterColumnValues = setA.map((element, index) => {
      const {user} = element;
      const twitterUserFromSetB = this.getSameTwitterUserFromSet(setB, element);
      const value = (element as TwitterColumnsStorage).value || (twitterUserFromSetB as TwitterColumnsStorage).value;
      const maxPosts = (element as TwitterUser).maxPosts || (twitterUserFromSetB as TwitterUser).maxPosts;
      this.layoutDataService.saveTwitterSingleColumnSubjectValue({
        isChanged: true,
        result: {index, user, value, maxPosts}
      });
      const {twitterColumns} = localStorageData;
      const userFromStorage = this.getSameTwitterUserFromSet(twitterColumns.map(data => ({...data})), element);
      return Object.assign(userFromStorage, {value});
    });
    if (isDefault) {
      this.userColumnData = this.defaultUsersSelectorsOrder.map(sel => ({...sel}));
    }
    this.layoutDataService.saveDefaultStateSubjectValue({isChanged: true, result: isDefault});
    this.saveTwitterUserColumnSubjectValue(this.userColumnData);
    Object.assign(localStorageData, {defaultStatus: isDefault, twitterColumns: newTwitterColumnValues});
    this.layoutDataService.setLayoutDataNoObservableOps(this.layoutDataService.dataKey, localStorageData);
  }
  decreasePostsQtyValue(value: number) {
    return --value;
  }
  getTwitterSingleColumnSubjectResult(data: LayoutDataLike) {
    return (data as TwitterColumnSubject);
  }
  getLatestLayoutData(): Observable<{twitterUsers: TwitterUser[], dataStorage: LayoutData}> {
    const layoutData$ = this.filledLayoutData$;
    const usersPosts$ = this.filledUsersPosts$;
    return combineLatest(usersPosts$, layoutData$).pipe(
      map(([twitterUsers, dataStorage]: [TwitterUser[], LayoutData]) => ({twitterUsers, dataStorage}))
    );
  }
  getSameTwitterUserFromSet(set: UserObj[], obj: UserObj): TwitterUserLike {
    return set.find(sel => sel.user === obj.user) as TwitterUserLike;
  }
  increasePostsQtyValue(value: number) {
    return ++value;
  }
  isSameTwitterPostsOrderByStorage(twitterColumns: TwitterColumnsStorage[], twitterUsers: TwitterUser[]): boolean {
    return twitterColumns.every((col, idx: number) =>
      twitterUsers[idx].user === col.user &&
      twitterUsers[idx].maxPosts === col.value
    );
  }
  saveTwitterUserColumnSubjectValue(data: TwitterUserColumnData[]) {
    this.twitterUserColumnData$.next(data);
  }
  setDefaultStateData(): Observable<[void, TwitterUser[]]> {
    return zip(this.layoutDataService.setDefaultLayoutData(), this.filledUsersPosts$).pipe(
      tap(([noOp, twitterUsers]: [void, TwitterUser[]]) => {
        const {sortColumns, twitterColumns, twitterTheme} = this.layoutDataService.defaultLocalData;
        this.layoutDataService.saveSortColumnSubjectValue({isChanged: true, result: sortColumns});
        this.layoutDataService.saveTwitterThemeColumnSubjectValue({isChanged: true, result: twitterTheme});
        this.changeAppLocalStorageData(twitterColumns, twitterUsers, true);
      })
    );
  }
  setDefaultUserSelectorsOrder() {
    this.userColumnData = this.defaultUsersSelectorsOrder.map(sel => ({...sel}));
    this.saveTwitterUserColumnSubjectValue(this.userColumnData);
  }
  setReorderedTwitterColumns(twitterColumns: TwitterColumnsStorage[], twitterUsers: TwitterUser[]) {
    this.userColumnData = twitterColumns.map((col) => {
      const user = this.getSameTwitterUserFromSet(this.userColumnData, col) as TwitterUserColumnData;
      return {...user} as TwitterUserColumnData;
    });
    this.changeAppLocalStorageData(this.userColumnData, twitterColumns, false);
  }
  switchUsersSelectorsByIdx(previousIndex: number, index: number): void {
    this.userColumnData = this.userColumnData.map((sel, idx, arr) => {
      if (idx === previousIndex) {
        return arr[index];
      } else if (idx === index) {
        return arr[previousIndex];
      }
      return arr[idx];
    });
    this.saveTwitterUserColumnSubjectValue(this.userColumnData);
  }
  private switchColumnData(
    index: number, previousIndex: number, firstIdx: number, secondIdx: number, thirdIdx: number): Observable<void | [void, void]> {
      const twitterColumnKeyName = this.layoutDataService.layoutDataKeys.TWITTER_COLUMNS;
      const previousIndexes = [[1, 2], [0, 2], [0, 1]];
      const aux = (this.layoutDataService.getTwitterSingleColumnSubject(firstIdx).getValue().result as TwitterColumnSubject);
      let valueToChange: TwitterColumnSubject;
      if (previousIndex === previousIndexes[index][0]) {
        valueToChange = (this.layoutDataService.getTwitterSingleColumnSubject(secondIdx).getValue().result as TwitterColumnSubject);
      } else if (previousIndex === previousIndexes[index][1]) {
        valueToChange = (this.layoutDataService.getTwitterSingleColumnSubject(thirdIdx).getValue().result as TwitterColumnSubject);
      }
      const firstResult = {index, user: valueToChange.user, value: valueToChange.value, maxPosts: valueToChange.maxPosts};
      const secondResult = {index: previousIndex, user: aux.user, value: aux.value, maxPosts: aux.maxPosts};
      this.layoutDataService.saveTwitterSingleColumnSubjectValue({
        isChanged: true,
        result: firstResult
      });
      this.layoutDataService.saveTwitterSingleColumnSubjectValue({
        isChanged: true,
        result: secondResult
      });
      this.switchUsersSelectorsByIdx(previousIndex, index);
      return zip(
        this.layoutDataService.setSingleLayoutDataProp(twitterColumnKeyName, firstResult),
        this.layoutDataService.setSingleLayoutDataProp(twitterColumnKeyName, secondResult)
      ).pipe(
        catchError(e => this.layoutDataService.handleLoadingDataError())
      );
  }
}
