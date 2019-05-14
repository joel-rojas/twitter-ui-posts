import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public firstColumnQtySubject: BehaviorSubject<number> = new BehaviorSubject(null);
  public orderColumnSwitchSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public secondColumnQtySubject: BehaviorSubject<number> = new BehaviorSubject(null);
  public thirdColumnQtySubject: BehaviorSubject<number> = new BehaviorSubject(null);
  constructor() { }
  changeTwitterColumnsData(data: {previousIndex: number, currentIndex: number}) {
    const {currentIndex, previousIndex} = data;
    switch (currentIndex) {
      case 0: {
        this.switchColumnData(currentIndex, previousIndex,
          this.firstColumnQtySubject, this.secondColumnQtySubject, this.thirdColumnQtySubject);
        break;
      }
      case 1: {
        this.switchColumnData(currentIndex, previousIndex,
          this.secondColumnQtySubject, this.firstColumnQtySubject, this.thirdColumnQtySubject);
        break;
      }
      case 2: {
        this.switchColumnData(currentIndex, previousIndex,
          this.thirdColumnQtySubject, this.firstColumnQtySubject, this.secondColumnQtySubject);
        break;
      }
    }
  }
  clearOrderColumnSwitch() {
    this.clearSubject(this.orderColumnSwitchSubject);
  }
  decreasePostsQtyValue(value: number) {
    return --value;
  }
  increasePostsQtyValue(value: number) {
    return ++value;
  }
  saveFirstColumnQtyValue(value: number) {
    this.saveSubject(this.firstColumnQtySubject, value);
  }
  saveSecondColumnQtyValue(value: number) {
    this.saveSubject(this.secondColumnQtySubject, value);
  }
  saveThirdColumnQtyValue(value: number) {
    this.saveSubject(this.thirdColumnQtySubject, value);
  }
  saveOrderColumnSwitchValue(value: boolean) {
    this.saveSubject(this.orderColumnSwitchSubject, value);
  }
  private clearSubject(subject: BehaviorSubject<any>) {
    subject.next(null);
  }
  private saveSubject(subject: BehaviorSubject<any>, value: any) {
    subject.next(value);
  }
  private switchColumnData(
    index: number, previousIndex: number, firstColSubject: BehaviorSubject<number>,
    secondColSubject: BehaviorSubject<number>, thirdColSubject: BehaviorSubject<number>) {
      const previousIndexes = [[1, 2], [0, 2], [0, 1]];
      const aux = firstColSubject.getValue();
      if (previousIndex === previousIndexes[index][0]) {
        firstColSubject.next(secondColSubject.getValue());
        secondColSubject.next(aux);
      } else if (previousIndex === previousIndexes[index][1]) {
        firstColSubject.next(thirdColSubject.getValue());
        thirdColSubject.next(aux);
      }
  }
}
