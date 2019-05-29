import { Component, OnInit, OnDestroy, AfterContentInit, HostListener } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PostService } from '../../services/ui/post.service';
import { LayoutDataService } from './../../services/local-data/layout-data.service';
import { LoadingService } from '../../services/ui/loading.service';

@Component({
  selector: 'app-tw-header',
  templateUrl: './tw-header.component.html',
  styleUrls: ['./tw-header.component.css']
})
export class TwHeaderComponent implements OnInit, OnDestroy, AfterContentInit {
  public firstColSubject$: BehaviorSubject<number>;
  public firstThemeCls = this.layoutDataService.appThemes.FIRST;
  public firstTwColumnLbl = 'First Column';
  public firstTwColumnQty: number;
  public isFirstThemeActive: boolean;
  public isSecondThemeActive: boolean;
  public isThirdThemeActive: boolean;
  public isButtonSwitched: boolean;
  public isEditLayoutBtnDisabled = false;
  public loadingSubject$: BehaviorSubject<number>;
  public secondColSubject$: BehaviorSubject<number>;
  public secondThemeCls = this.layoutDataService.appThemes.SECOND;
  public secondTwColumnLbl = 'Second Column';
  public secondTwColumnQty: number;
  public selectedTheme: string;
  public selectThemeSubject$: BehaviorSubject<string>;
  public sortColumnSwitchSubject$: BehaviorSubject<boolean>;
  public subscriptions: Subscription = new Subscription();
  public switchCls = 'menu-switch-btn';
  public switchLabel = 'Sort Columns';
  public switchLabelPosition = 'before';
  public switchDescription = `Drag n' drop twitter posts columns while the switch is on.`;
  public thirdColSubject$: BehaviorSubject<number>;
  public thirdThemeCls = this.layoutDataService.appThemes.THIRD;
  public thirdTwColumnLbl = 'Third Column';
  public thirdTwColumnQty: number;
  public menuNavbarCSSClasses: object;
  public openEditLayout = false;
  public openNavbar = true;

  constructor(private postService: PostService, private layoutDataService: LayoutDataService, private loadingService: LoadingService) {
    this.loadingSubject$ = this.loadingService.loadingSubject;
    this.sortColumnSwitchSubject$ = this.postService.sortColumnSwitchSubject$;
    this.firstColSubject$ = this.postService.firstColumnQtySubject$;
    this.secondColSubject$ = this.postService.secondColumnQtySubject$;
    this.thirdColSubject$ = this.postService.thirdColumnQtySubject$;
    this.selectThemeSubject$ = this.postService.selectThemeSubject$;
  }

  ngOnInit() {
    this.setComponentUIBehavior();
    this.subscriptions.add(this.loadingSubject$.subscribe(value => this.isEditLayoutBtnDisabled = value !== 0));
    this.subscriptions.add(this.sortColumnSwitchSubject$.subscribe(value => {
      this.isButtonSwitched = value;
    }));
    this.subscriptions.add(this.firstColSubject$.subscribe(this.changeColValueBySubscription('firstTwColumnQty')));
    this.subscriptions.add(this.secondColSubject$.subscribe(this.changeColValueBySubscription('secondTwColumnQty')));
    this.subscriptions.add(this.thirdColSubject$.subscribe(this.changeColValueBySubscription('thirdTwColumnQty')));
    this.subscriptions.add(this.selectThemeSubject$.subscribe(theme => {
      this.selectedTheme = theme;
      this.isFirstThemeActive = this.selectedTheme === this.firstThemeCls;
      this.isSecondThemeActive = this.selectedTheme === this.secondThemeCls;
      this.isThirdThemeActive = this.selectedTheme === this.thirdThemeCls;
    }));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngAfterContentInit() {
    this.onSwitchBtnEvent(this.isButtonSwitched);
  }
  setComponentUIBehavior() {
    this.menuNavbarCSSClasses = {
      collapse: this.openNavbar
    };
    this.openEditLayout = !this.openNavbar && this.openEditLayout;
  }
  // Events
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
    this.postService.saveSortColumnSwitchValue(event);
  }
  onSelectFirstTheme() {
    this.postService.saveThemeSelectedValue(this.firstThemeCls);
  }
  onSelectSecondTheme() {
    this.postService.saveThemeSelectedValue(this.secondThemeCls);
  }
  onSelectThirdTheme() {
    this.postService.saveThemeSelectedValue(this.thirdThemeCls);
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
