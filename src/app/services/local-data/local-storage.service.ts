import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, of, throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { LayoutData } from './layout-data.config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public layoutDataSubject$:
    BehaviorSubject<LayoutData> = new BehaviorSubject<LayoutData>(null);

  constructor(@Inject('LOCAL_STORAGE') private localStorage: Storage) {}
  getAppLocalStorageData(key: string): LayoutData {
    return this.getJSONValue(this.localStorage.getItem(key));
  }
  saveLayoutSubjectData(data: LayoutData): void {
    this.layoutDataSubject$.next(data);
  }
  setAppLocalStorageData(key: string, value: LayoutData): Observable<void> {
      const stringifiedValue = this.getStringifiedValue(value);
      return of(this.localStorage.setItem(key, stringifiedValue)).
        pipe(
          tap(() => this.saveLayoutSubjectData(value)),
          catchError((e) => throwError(e))
        );
  }
  private getStringifiedValue(value: object): string {
    return JSON.stringify(value);
  }
  private getJSONValue(value: string): LayoutData {
    return JSON.parse(value);
  }
}
