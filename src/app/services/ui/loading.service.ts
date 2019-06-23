import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loadingSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() { }
  clearLoadingSubject() {
    this.loadingSubject.next(null);
  }
  setLoadingValue(value: number) {
    this.loadingSubject.next(value);
  }
}
