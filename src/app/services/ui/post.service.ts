import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public orderColumnSwitchSubject: BehaviorSubject<MatSlideToggleChange> = new BehaviorSubject(null);
  constructor() { }
  saveOrderColumnSwitchValue(value: MatSlideToggleChange) {
    this.orderColumnSwitchSubject.next(value);
  }
  clearOrderColumnSwitch() {
    this.orderColumnSwitchSubject.next(null);
  }
}
