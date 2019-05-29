import { LoadingService } from 'src/app/services/ui/loading.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutDataService {
  public readonly appThemes = {
    FIRST: 'theme1',
    SECOND: 'theme2',
    THIRD: 'theme3'
  };
  public dataKey = 'app';
  public defaultLocalData: object = {
    defaultStatus: true,
    sortColumns: false,
    twitterColumns: [30, 30, 30],
    twitterTheme: this.appThemes.FIRST
  };
  public readonly layoutDataKeys = {
    DEFAULT_STATUS: 'defaultStatus',
    SORT_COLUMNS: 'sortColumns',
    TWITTER_COLUMNS: 'twitterColumns',
    TWITTER_THEME: 'twitterTheme'
  };
  constructor(
    private loadingService: LoadingService,
    private localStorage: LocalStorageService) {
    this.initLayoutLocalDataConfig();
  }
  getLayoutData() {
    return this.localStorage.getAppLocalStorageData(this.dataKey);
  }
  initLayoutLocalDataConfig() {
    const layoutData = this.getLayoutData();
    if (layoutData == null) {
      this.setDefaultLayoutData();
    }
  }
  setLayoutData(key: string, data: boolean|{index: number, value: number}|string) {
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
        layoutData[key] = layoutData[key].map((column: number, idx: number, arr: number[]) => {
          data = data as {index: number, value: number};
          if (data.index === idx) {
            arr[idx] = data.value;
          }
          return arr[idx];
        });
        break;
      }
      default: break;
    }
    this.localStorage.setAppLocalStorageData(this.dataKey, layoutData).pipe(
      catchError(e => this.handleLoadingDataError())
    );
  }
  setDefaultLayoutData() {
    this.localStorage.setAppLocalStorageData(this.dataKey, this.defaultLocalData).pipe(
      catchError(e => this.handleLoadingDataError())
    );
  }
  private handleLoadingDataError() {
    return of(this.loadingService.setLoadingValue(-1));
  }
}
