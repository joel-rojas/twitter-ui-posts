import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { AppState } from './../../store';
import { LoadTwitterPosts, SwitchTwitterPosts, ModifyTwitterPostsQty, ResetTwitterPosts } from './../../store/twitter/twitter.actions';
import { TwitterUser, TwitterUserSelector } from './../../store/twitter/twitter.model';
import { LayoutDataService } from './../../services/local-data/layout-data.service';
import { LayoutData, LayoutDataSubject } from './../../services/local-data/layout-data.config';
import { PostService } from './../../services/ui/post.service';

@Component({
  selector: 'app-tw-posts',
  templateUrl: './tw-posts.component.html',
  styleUrls: ['./tw-posts.component.css']
})
export class TwPostsComponent implements OnInit, AfterContentInit, OnDestroy {
  public enableOrderColumn: boolean;
  public defaultStateSubject$: BehaviorSubject<LayoutDataSubject>;
  public firstColumnQtySubject$: BehaviorSubject<LayoutDataSubject>;
  public latestLayoutData$: Observable<{twitterUsers: TwitterUser[], dataStorage: LayoutData}>;
  public secondColumnQtySubject$: BehaviorSubject<LayoutDataSubject>;
  public sortColumnSwitchSubject$: BehaviorSubject<LayoutDataSubject>;
  public subscriptions = new Subscription();
  public thirdColumnQtySubject$: BehaviorSubject<LayoutDataSubject>;
  public usersPosts$: Observable<TwitterUser[]>;
  public usersSelectorsSubject$: BehaviorSubject<TwitterUserSelector[]>;
  public firstUserPosts$: Observable<TwitterUser>;
  public secondUserPosts$: Observable<TwitterUser>;
  public thirdUserPosts$: Observable<TwitterUser>;
  constructor(
    private store: Store<AppState>,
    private postService: PostService, private layoutDataService: LayoutDataService) {
      this.latestLayoutData$ = this.postService.getLatestLayoutData();
      this.usersPosts$ = this.postService.usersPosts$;
      this.usersSelectorsSubject$ = this.postService.usersSelectorsSubject$;
      this.firstColumnQtySubject$ = this.layoutDataService.twitterColumnsSubject$[0];
      this.secondColumnQtySubject$ = this.layoutDataService.twitterColumnsSubject$[1];
      this.thirdColumnQtySubject$ = this.layoutDataService.twitterColumnsSubject$[2];
      this.sortColumnSwitchSubject$ = this.layoutDataService.sortColumnsSubject$;
  }

  ngOnInit() {
    this.store.dispatch(new LoadTwitterPosts());
  }
  ngAfterContentInit() {
    this.subscriptions.add(
      this.latestLayoutData$.subscribe(({twitterUsers, dataStorage}: {twitterUsers: TwitterUser[], dataStorage: LayoutData}) => {
        this.enableOrderColumn = dataStorage.sortColumns;
        const defaultStateSubjectValue = this.layoutDataService.defaultStatusSubject$.getValue();
        if (defaultStateSubjectValue.isChanged && defaultStateSubjectValue.result) {
          this.postService.setDefaultUserSelectorsOrder();
          this.store.dispatch(new ResetTwitterPosts());
          return;
        }
        const twitterFirstColumnSubjectValue = this.layoutDataService.twitterColumnsSubject$[0].getValue();
        const twitterSecondColumnSubjectValue = this.layoutDataService.twitterColumnsSubject$[1].getValue();
        const twitterThirdColumnSubjectValue = this.layoutDataService.twitterColumnsSubject$[2].getValue();
        this.changeTwitterPostsQtyBySubjectValue(twitterFirstColumnSubjectValue, dataStorage);
        this.changeTwitterPostsQtyBySubjectValue(twitterSecondColumnSubjectValue, dataStorage);
        this.changeTwitterPostsQtyBySubjectValue(twitterThirdColumnSubjectValue, dataStorage);
      })
    );
    this.subscriptions.add(
      this.usersSelectorsSubject$.subscribe(data => {
        this.firstUserPosts$ = this.store.pipe(select(data[0].fn));
        this.secondUserPosts$ = this.store.pipe(select(data[1].fn));
        this.thirdUserPosts$ = this.store.pipe(select(data[2].fn));
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  // Methods
  changeTwitterPostsQtyBySubjectValue(subject: LayoutDataSubject, data: LayoutData) {
    const {index, value, user} = this.postService.getTwitterSingleColumnSubjectResult(subject.result);
    if (subject.isChanged) {
      this.layoutDataService.saveTwitterSingleColumnSubjectValue({isChanged: false, result: {index, user, value}});
      this.store.dispatch(new ModifyTwitterPostsQty({index, user, value}));
    }
  }
  // Events
  onDropTwitterUserPostsEv(event: {previousIndex: number, currentIndex: number}) {
    const {previousIndex, currentIndex} = event;
    this.subscriptions.add(
      this.postService.changeTwitterColumnsData(event).subscribe(
        () => {
          this.store.dispatch(new SwitchTwitterPosts({previousIndex, currentIndex}));
        })
    );
  }
}
