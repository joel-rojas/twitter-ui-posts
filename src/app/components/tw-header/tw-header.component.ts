import { Component, OnInit, Output, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PostService } from '../../services/ui/post.service';

@Component({
  selector: 'app-tw-header',
  templateUrl: './tw-header.component.html',
  styleUrls: ['./tw-header.component.css']
})
export class TwHeaderComponent implements OnInit, OnDestroy, AfterContentInit {
  public firstColSubject: BehaviorSubject<number>;
  public firstColSubscription: Subscription;
  public firstTwColumnLbl = 'First Column';
  public firstTwColumnQty: number;
  public isButtonSwitched = false;
  public secondColSubject: BehaviorSubject<number>;
  public secondColSubscription: Subscription;
  public secondTwColumnLbl = 'Second Column';
  public secondTwColumnQty: number;
  public switchCls = 'menu-switch-btn';
  public switchLabel = 'Order Columns';
  public switchLabelPosition = 'before';
  public switchDescription = `Drag n' drop twitter posts columns while the switch is on.`;
  public thirdColSubject: BehaviorSubject<number>;
  public thirdColSubscription: Subscription;
  public thirdTwColumnLbl = 'Third Column';
  public thirdTwColumnQty: number;
  public editLayoutCSSClasses;
  public menuNavbarCSSClasses;
  public openEditLayout = false;
  public openNavbar = true;
  constructor(private postService: PostService) {
    this.firstColSubject = this.postService.firstColumnQtySubject;
    this.secondColSubject = this.postService.secondColumnQtySubject;
    this.thirdColSubject = this.postService.thirdColumnQtySubject;
  }

  ngOnInit() {
    this.setComponentUIBehavior();
    this.firstColSubscription = this.firstColSubject.subscribe(this.changeColValueBySubscription('firstTwColumnQty'));
    this.secondColSubscription = this.secondColSubject.subscribe(this.changeColValueBySubscription('secondTwColumnQty'));
    this.thirdColSubscription = this.thirdColSubject.subscribe(this.changeColValueBySubscription('thirdTwColumnQty'));
  }
  ngOnDestroy() {
    this.firstColSubscription.unsubscribe();
    this.secondColSubscription.unsubscribe();
    this.thirdColSubscription.unsubscribe();
  }
  ngAfterContentInit() {
    this.onSwitchBtnEvent(this.isButtonSwitched);
  }
  setComponentUIBehavior() {
    this.menuNavbarCSSClasses = {
      'collapse': this.openNavbar
    };
    this.openEditLayout = !this.openNavbar && this.openEditLayout;
  }
  // Events
  onClickSwitchContainerEvent() {
    this.isButtonSwitched = !this.isButtonSwitched;
  }
  onDecreaseFirstValueEvent(event: number) {
    this.firstTwColumnQty = this.postService.decreasePostsQtyValue(event);
    this.postService.saveFirstColumnQtyValue(this.firstTwColumnQty);
  }
  onDecreaseSecondValueEvent(event: number) {
    this.secondTwColumnQty = this.postService.decreasePostsQtyValue(event);
    this.postService.saveSecondColumnQtyValue(this.secondTwColumnQty);
  }
  onDecreaseThirdValueEvent(event: number) {
    this.thirdTwColumnQty = this.postService.decreasePostsQtyValue(event);
    this.postService.saveThirdColumnQtyValue(this.thirdTwColumnQty);
  }
  onIncreaseFirstValueEvent(event: number) {
    this.firstTwColumnQty = this.postService.increasePostsQtyValue(event);
    this.postService.saveFirstColumnQtyValue(this.firstTwColumnQty);
  }
  onIncreaseSecondValueEvent(event: number) {
    this.secondTwColumnQty = this.postService.increasePostsQtyValue(event);
    this.postService.saveSecondColumnQtyValue(this.secondTwColumnQty);
  }
  onIncreaseThirdValueEvent(event: number) {
    this.thirdTwColumnQty = this.postService.increasePostsQtyValue(event);
    this.postService.saveThirdColumnQtyValue(this.thirdTwColumnQty);
  }
  onSwitchBtnEvent(event: boolean) {
    this.postService.saveOrderColumnSwitchValue(event);
  }
  openEditLayoutEvent() {
    this.openEditLayout = !this.openEditLayout;
  }
  toggleNavbarEvent() {
    this.openNavbar = !this.openNavbar;
    this.setComponentUIBehavior();
  }
  private changeColValueBySubscription(colName: string) {
    return (value: number) => {
      this[colName] = value || 30;
    };
  }
}
