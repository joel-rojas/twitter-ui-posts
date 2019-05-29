import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LayoutDataService } from './../local-data/layout-data.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public firstColumnQtySubject$: BehaviorSubject<number> = new BehaviorSubject(null);
  public sortColumnSwitchSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public secondColumnQtySubject$: BehaviorSubject<number> = new BehaviorSubject(null);
  public thirdColumnQtySubject$: BehaviorSubject<number> = new BehaviorSubject(null);
  public selectThemeSubject$: BehaviorSubject<string> = new BehaviorSubject(this.layoutDataService.appThemes.FIRST);
  constructor(private layoutDataService: LayoutDataService) { }
  changeTwitterColumnsData(data: {previousIndex: number, currentIndex: number}) {
    const {currentIndex, previousIndex} = data;
    switch (currentIndex) {
      case 0: {
        this.switchColumnData(currentIndex, previousIndex,
          this.firstColumnQtySubject$, this.secondColumnQtySubject$, this.thirdColumnQtySubject$);
        break;
      }
      case 1: {
        this.switchColumnData(currentIndex, previousIndex,
          this.secondColumnQtySubject$, this.firstColumnQtySubject$, this.thirdColumnQtySubject$);
        break;
      }
      case 2: {
        this.switchColumnData(currentIndex, previousIndex,
          this.thirdColumnQtySubject$, this.firstColumnQtySubject$, this.secondColumnQtySubject$);
        break;
      }
    }
  }
  decreasePostsQtyValue(value: number) {
    return --value;
  }
  increasePostsQtyValue(value: number) {
    return ++value;
  }
  saveFirstColumnQtyValue(value: number) {
    this.saveSubject(this.firstColumnQtySubject$, value);
  }
  saveSortColumnSwitchValue(value: boolean) {
    this.saveSubject(this.sortColumnSwitchSubject$, value);
  }
  saveSecondColumnQtyValue(value: number) {
    this.saveSubject(this.secondColumnQtySubject$, value);
  }
  saveThirdColumnQtyValue(value: number) {
    this.saveSubject(this.thirdColumnQtySubject$, value);
  }
  saveThemeSelectedValue(value: string) {
    this.saveSubject(this.selectThemeSubject$, value);
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
