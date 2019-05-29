import { BehaviorSubject, of, throwError, EMPTY, Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public layoutDataSubject$: BehaviorSubject<object> = new BehaviorSubject<object>(null);

  constructor(@Inject('LOCAL_STORAGE') private localStorage: Storage) {
    this.localStorage = this.localStorage[0];
  }
  getAppLocalStorageData(key: string) {
    return this.getJSONValue(this.localStorage.getItem(key));
  }
  saveLayoutSubjectData(data: object) {
    this.layoutDataSubject$.next(data);
  }
  setAppLocalStorageData(key: string, value: object): Observable<any> {
    const stringifiedValue = this.getStringifiedValue(value);
    return of(this.localStorage.setItem(key, stringifiedValue)).
      pipe(
        tap(() => this.saveLayoutSubjectData(value)),
        catchError((e) => throwError(e))
      );
  }
  private getStringifiedValue(value: object) {
    return JSON.stringify(value);
  }
  private getJSONValue(value: string) {
    return JSON.parse(value);
  }
}
