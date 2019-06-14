import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostService } from '../../services/ui/post.service';
import { LayoutDataService } from '../../services/local-data/layout-data.service';
import { LoadingService } from '../../services/ui/loading.service';
import { LayoutDataLike, LayoutData } from '../../services/local-data/layout-data.config';
import { TwitterUser } from '../../store/twitter/twitter.model';

@Component({
  selector: 'app-tw-header',
  templateUrl: './tw-header.component.html',
  styleUrls: ['./tw-header.component.css']
})
export class TwHeaderComponent implements OnInit, OnDestroy {
  public defaultStatusKeyName: string;
  public firstThemeCls = this.layoutDataService.appThemes.FIRST;
  public firstTwColumnLbl = 'First Column';
  public firstTwColumnQty: number;
  public isFirstThemeActive: boolean;
  public isSecondThemeActive: boolean;
  public isThirdThemeActive: boolean;
  public isButtonSwitched: boolean;
  public isEditLayoutBtnDisabled = false;
  public latestLayoutData$: Observable<{twitterUsers: TwitterUser[], dataStorage: LayoutData}>;
  public loadingSubject$: BehaviorSubject<number>;
  public menuNavbarCSSClasses: object;
  public openEditLayout = false;
  public openNavbar = true;
  public secondThemeCls = this.layoutDataService.appThemes.SECOND;
  public secondTwColumnLbl = 'Second Column';
  public secondTwColumnQty: number;
  public selectedTheme: string;
  public sortColumnKeyName: string;
  public subscriptions: Subscription = new Subscription();
  public switchCls = 'menu-switch-btn';
  public switchLabel = 'Sort Columns';
  public switchLabelPosition = 'before';
  public switchDescription = `Drag n' drop twitter posts columns while the switch is on.`;
  public thirdThemeCls = this.layoutDataService.appThemes.THIRD;
  public thirdTwColumnLbl = 'Third Column';
  public thirdTwColumnQty: number;
  public twitterColumnsKeyName: string;
  public twitterThemeKeyName: string;

  constructor(private postService: PostService, private layoutDataService: LayoutDataService, private loadingService: LoadingService) {
    this.loadingSubject$ = this.loadingService.loadingSubject;
    this.latestLayoutData$ = this.postService.getLatestLayoutData();
    const {SORT_COLUMNS, DEFAULT_STATUS, TWITTER_COLUMNS, TWITTER_THEME} = this.layoutDataService.layoutDataKeys;
    this.sortColumnKeyName = SORT_COLUMNS;
    this.defaultStatusKeyName = DEFAULT_STATUS;
    this.twitterColumnsKeyName = TWITTER_COLUMNS;
    this.twitterThemeKeyName = TWITTER_THEME;
  }

  ngOnInit() {
    this.setComponentUIBehavior();
    this.subscriptions.add(this.loadingSubject$.subscribe(value => this.isEditLayoutBtnDisabled = value !== 0));
    this.subscriptions.add(
      this.latestLayoutData$.subscribe(({twitterUsers, dataStorage}: {twitterUsers: TwitterUser[], dataStorage: LayoutData}) => {
        const {defaultStatus, sortColumns, twitterColumns, twitterTheme} = dataStorage;
        const [firstCol, secondCol, thirdCol] = twitterColumns;
        this.isButtonSwitched = sortColumns;
        this.firstTwColumnQty = firstCol.value;
        this.secondTwColumnQty = secondCol.value;
        this.thirdTwColumnQty = thirdCol.value;
        this.selectedTheme = twitterTheme;
        this.isFirstThemeActive = this.selectedTheme === this.firstThemeCls;
        this.isSecondThemeActive = this.selectedTheme === this.secondThemeCls;
        this.isThirdThemeActive = this.selectedTheme === this.thirdThemeCls;
      }
    ));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  changeSingleTwitterPostQty(value: number, colIndex: number, type: boolean) {
    const subject = this.layoutDataService.twitterColumnsSubject$[colIndex].getValue();
    const subjectData = this.postService.getTwitterSingleColumnSubjectResult(subject.result);
    const newValue = type ? this.postService.increasePostsQtyValue(value) : this.postService.decreasePostsQtyValue(value);
    const valueToSave = {index: colIndex, user: subjectData.user, value: newValue};
    this.layoutDataService.saveDefaultStateSubjectValue({isChanged: true, result: false});
    this.layoutDataService.saveTwitterSingleColumnSubjectValue({isChanged: true, result: valueToSave});
    this.setLayoutData(this.twitterColumnsKeyName, valueToSave);
  }
  changeTwitterTheme(type: string) {
    this.layoutDataService.saveDefaultStateSubjectValue({isChanged: true, result: false});
    this.layoutDataService.saveTwitterThemeColumnSubjectValue({isChanged: true, result: type});
    this.setLayoutData(this.twitterThemeKeyName, type);
  }
  setDefaultLayoutData() {
    this.subscriptions.add(
      this.layoutDataService.setDefaultLayoutData().pipe(
        tap(() => {
          const {sortColumns, twitterColumns, twitterTheme} = this.layoutDataService.defaultLocalData;
          this.layoutDataService.saveSortColumnSubjectValue({isChanged: true, result: sortColumns});
          this.layoutDataService.saveTwitterThemeColumnSubjectValue({isChanged: true, result: twitterTheme});
          twitterColumns.forEach((colStorage, index) =>
            this.layoutDataService.saveTwitterSingleColumnSubjectValue({
              isChanged: true,
              result: {index, user: colStorage.user, value: colStorage.value}
            })
          );
        })
      ).subscribe()
    );
  }
  setLayoutData(keyName: string, value: LayoutDataLike) {
    this.subscriptions.add(
      this.layoutDataService.setMultipleLayoutDataProps([
        { key: this.defaultStatusKeyName, data: false },
        { key: keyName, data: value }
      ]).subscribe()
    );
  }
  setComponentUIBehavior() {
    this.menuNavbarCSSClasses = {
      collapse: this.openNavbar
    };
    this.openEditLayout = !this.openNavbar && this.openEditLayout;
  }
  // Events
  onClearLayoutChanges() {
    this.layoutDataService.saveDefaultStateSubjectValue({isChanged: true, result: true});
    this.setDefaultLayoutData();
  }
  onDecreaseFirstValueEvent(event: number) {
    this.changeSingleTwitterPostQty(event, 0, false);
  }
  onDecreaseSecondValueEvent(event: number) {
    this.changeSingleTwitterPostQty(event, 1, false);
  }
  onDecreaseThirdValueEvent(event: number) {
    this.changeSingleTwitterPostQty(event, 2, false);
  }
  onIncreaseFirstValueEvent(event: number) {
    this.changeSingleTwitterPostQty(event, 0, true);
  }
  onIncreaseSecondValueEvent(event: number) {
    this.changeSingleTwitterPostQty(event, 1, true);
  }
  onIncreaseThirdValueEvent(event: number) {
    this.changeSingleTwitterPostQty(event, 2, true);
  }
  onSwitchBtnEvent(event: boolean) {
    this.layoutDataService.saveSortColumnSubjectValue({isChanged: true, result: event});
    this.layoutDataService.saveDefaultStateSubjectValue({isChanged: true, result: false});
    this.setLayoutData(this.sortColumnKeyName, event);
  }
  onSelectFirstTheme() {
    this.changeTwitterTheme(this.firstThemeCls);
  }
  onSelectSecondTheme() {
    this.changeTwitterTheme(this.secondThemeCls);
  }
  onSelectThirdTheme() {
    this.changeTwitterTheme(this.thirdThemeCls);
  }
  openEditLayoutEvent() {
    this.openEditLayout = !this.openEditLayout;
  }
  toggleNavbarEvent() {
    this.openNavbar = !this.openNavbar;
    this.setComponentUIBehavior();
  }
}
