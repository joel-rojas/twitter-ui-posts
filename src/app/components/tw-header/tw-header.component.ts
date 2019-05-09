import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PostService } from '../../services/ui/post.service';

@Component({
  selector: 'app-tw-header',
  templateUrl: './tw-header.component.html',
  styleUrls: ['./tw-header.component.css']
})
export class TwHeaderComponent implements OnInit, OnDestroy {
  public firstColSubject: BehaviorSubject<number>;
  public firstColSubscription: Subscription;
  public firstTwColumnLbl = 'First Column';
  public firstTwColumnQty: number;
  public secondColSubject: BehaviorSubject<number>;
  public secondColSubscription: Subscription;
  public secondTwColumnLbl = 'Second Column';
  public secondTwColumnQty: number;
  public thirdColSubject: BehaviorSubject<number>;
  public thirdColSubscription: Subscription;
  public thirdTwColumnLbl = 'Third Column';
  public thirdTwColumnQty: number;
  public editLayoutCSSClasses;
  public menuNavbarCSSClasses;
  public openEditLayout = false;
  public openNavbar = true;
  @Output() switchBtn: EventEmitter<MatSlideToggleChange> = new EventEmitter(null);
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
  setComponentUIBehavior() {
    this.menuNavbarCSSClasses = {
      'collapse': this.openNavbar
    };
    this.openEditLayout = !this.openNavbar && this.openEditLayout;
  }
  // Events
  openEditLayoutEvent() {
    this.openEditLayout = !this.openEditLayout;
  }
  toggleNavbarEvent() {
    this.openNavbar = !this.openNavbar;
    this.setComponentUIBehavior();
  }
  onSwitchBtnEvent(event: MatSlideToggleChange) {
    this.postService.saveOrderColumnSwitchValue(event);
  }
  onDecreaseFirstValue(event: number) {
    this.firstTwColumnQty = this.postService.decreasePostsQtyValue(event);
    this.postService.saveFirstColumnQtyValue(this.firstTwColumnQty);
  }
  onDecreaseSecondValue(event: number) {
    this.secondTwColumnQty = this.postService.decreasePostsQtyValue(event);
    this.postService.saveSecondColumnQtyValue(this.secondTwColumnQty);
  }
  onDecreaseThirdValue(event: number) {
    this.thirdTwColumnQty = this.postService.decreasePostsQtyValue(event);
    this.postService.saveThirdColumnQtyValue(this.thirdTwColumnQty);
  }
  onIncreaseFirstValue(event: number) {
    this.firstTwColumnQty = this.postService.increasePostsQtyValue(event);
    this.postService.saveFirstColumnQtyValue(this.firstTwColumnQty);
  }
  onIncreaseSecondValue(event: number) {
    this.secondTwColumnQty = this.postService.increasePostsQtyValue(event);
    this.postService.saveSecondColumnQtyValue(this.secondTwColumnQty);
  }
  onIncreaseThirdValue(event: number) {
    this.thirdTwColumnQty = this.postService.increasePostsQtyValue(event);
    this.postService.saveThirdColumnQtyValue(this.thirdTwColumnQty);
  }
  private changeColValueBySubscription(colName: string) {
    return (value: number) => {
      // this[colName] = 30;
      // if (value) {
      this[colName] = value || 30;
      // }
    };
  }
}
