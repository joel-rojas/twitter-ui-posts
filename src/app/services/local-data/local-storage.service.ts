import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, of, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LayoutData } from './layout-data.config';
import { LoadingService } from './../ui/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public layoutDataSubject$:
    BehaviorSubject<LayoutData> = new BehaviorSubject<LayoutData>(null);

  constructor(
    @Inject('LOCAL_STORAGE') private localStorage: Storage,
    private loadingService: LoadingService) {}

  getAppLocalStorageData(key: string): LayoutData {
    return this.getJSONValue(this.localStorage.getItem(key));
  }
  getLocalStorage(): Storage {
    return this.localStorage;
  }
  saveLayoutSubjectData(data: LayoutData): void {
    this.layoutDataSubject$.next(data);
  }
  setAppLocalStorageData(key: string, value: LayoutData): Observable<void> {
    const stringifiedValue = this.getStringifiedValue(value);
    return of(this.localStorage.setItem(key, stringifiedValue)).
      pipe(
        tap(() => this.saveLayoutSubjectData(value)),
        catchError((e) => {
          this.loadingService.setLoadingValue(-1);
          return throwError(e);
        })
      );
  }
  setAppLocalStorageDataNoObservable(key: string, data: LayoutData) {
    try {
      this.saveLayoutSubjectData(data);
      this.localStorage.setItem(key, this.getStringifiedValue(data));
    } catch (err) {
      this.loadingService.setLoadingValue(-1);
      throw err;
    }
  }
  private getStringifiedValue(value: LayoutData): string {
    return JSON.stringify(value);
  }
  private getJSONValue(value: string): LayoutData {
    return JSON.parse(value);
  }
}
