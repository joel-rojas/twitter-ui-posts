import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { zip, Observable, combineLatest, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { AppState } from './../../store/index';
import { selectTwitterPostsByUser,
  selectMakeSchoolTwitterUser,
  selectNewsYCombinatorTwitterUser,
  selectYCombinatorTwitterUser
} from './../../store/twitter/twitter.selectors';
import { TwitterUser, TwitterUserSelector } from './../../store/twitter/twitter.model';
import { LayoutDataService } from './../local-data/layout-data.service';
import { LayoutDataLike, LayoutData, TwitterColumnsStorage, TwitterColumnSubject } from './../local-data/layout-data.config';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public readonly defaultUsersSelectorsOrder: TwitterUserSelector[] =
    this.layoutDataService.defaultLocalData.twitterColumns.map(data => {
      const {user} = data;
      if (user === 'MakeSchool') {
        return {user, fn: selectMakeSchoolTwitterUser};
      } else if (user === 'newsycombinator') {
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
  public usersPosts$: Observable<TwitterUser[]>;
  public usersSelectors: TwitterUserSelector[];
  public usersSelectorsSubject$: BehaviorSubject<TwitterUserSelector[]>;
  constructor(private store: Store<AppState>, private layoutDataService: LayoutDataService) {
    this.usersSelectorsSubject$ = new BehaviorSubject(this.usersSelectors);
    this.setDefaultUserSelectorsOrder();
    this.layoutData$ = this.layoutDataService.getLayoutDataAsObservable();
    this.filledLayoutData$ = this.layoutData$.pipe(filter((dataStorage) => dataStorage !== null));
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
  increasePostsQtyValue(value: number) {
    return ++value;
  }
  isSameTwitterPostsOrderByStorage(twitterColumns: TwitterColumnsStorage[], twitterUsers: TwitterUser[]): boolean {
    return twitterColumns.every((col, idx: number) =>
      twitterUsers[idx].user === col.user && twitterUsers[idx].posts.length === col.value
    );
  }
  saveUsersSelectorSubjectValue(data: TwitterUserSelector[]) {
    this.usersSelectorsSubject$.next(data);
  }
  setDefaultUserSelectorsOrder() {
    this.usersSelectors = this.defaultUsersSelectorsOrder.map(sel => ({...sel}));
    this.saveUsersSelectorSubjectValue(this.usersSelectors);
  }
  setReOrderedSelectors(twitterColumns: TwitterColumnsStorage[]) {
    this.usersSelectors = twitterColumns.map((col) =>
      this.usersSelectors.find(sel => sel.user === col.user)
    );
    this.saveUsersSelectorSubjectValue(this.usersSelectors);
  }
  switchUsersSelectorsByIdx(previousIndex: number, index: number): void {
    this.usersSelectors = this.usersSelectors.map((sel, idx, arr) => {
      if (idx === previousIndex) {
        return arr[index];
      } else if (idx === index) {
        return arr[previousIndex];
      }
      return arr[idx];
    });
    this.saveUsersSelectorSubjectValue(this.usersSelectors);
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
      const firstResult = {index, user: valueToChange.user, value: valueToChange.value};
      const secondResult = {index: previousIndex, user: aux.user, value: aux.value};
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
