import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './../../services/api/api.service';
import { PostService } from './../../services/ui/post.service';
import { AppState } from './../../store';
import { LoadTwitterPosts, SwitchTwitterPosts, ModifyTwitterPostsQty } from './../../store/twitter/twitter.actions';
import { TwitterPosts } from './../../store/twitter/twitter.model';
import { selectTwitterPostsByUser } from './../../store/twitter/twitter.selectors';

@Component({
  selector: 'app-tw-posts',
  templateUrl: './tw-posts.component.html',
  styleUrls: ['./tw-posts.component.css']
})
export class TwPostsComponent implements OnInit, AfterViewInit, OnDestroy {
  public enableOrderColumn = false;
  public firstColumnQtySubject: BehaviorSubject<number>;
  public firstColumnQtySubscription: Subscription;
  public orderColumnSubscription: Subscription;
  public orderColumnSwitchSubject: BehaviorSubject<MatSlideToggleChange>;
  public secondColumnQtySubject: BehaviorSubject<number>;
  public secondColumnQtySubscription: Subscription;
  public thirdColumnQtySubject: BehaviorSubject<number>;
  public thirdColumnQtySubscription: Subscription;
  public userPosts$: Observable<Array<{id: number, user: string, posts: TwitterPosts[]}>>;
  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private postService: PostService) {
      this.userPosts$ = this.store.pipe(select(selectTwitterPostsByUser));
      this.orderColumnSwitchSubject = this.postService.orderColumnSwitchSubject;
      this.firstColumnQtySubject = this.postService.firstColumnQtySubject;
      this.secondColumnQtySubject = this.postService.secondColumnQtySubject;
      this.thirdColumnQtySubject = this.postService.thirdColumnQtySubject;
    }

  ngOnInit() {
    this.store.dispatch(new LoadTwitterPosts());
  }
  ngAfterViewInit() {
    this.orderColumnSubscription = this.orderColumnSwitchSubject.subscribe(value => {
      this.enableOrderColumn = value != null && value.checked;
    });
    this.firstColumnQtySubscription = this.firstColumnQtySubject.subscribe(this.modifyColumnQty(0));
    this.secondColumnQtySubscription = this.secondColumnQtySubject.subscribe(this.modifyColumnQty(1));
    this.thirdColumnQtySubscription = this.thirdColumnQtySubject.subscribe(this.modifyColumnQty(2));
  }
  ngOnDestroy() {
    this.orderColumnSubscription.unsubscribe();
    this.firstColumnQtySubscription.unsubscribe();
    this.secondColumnQtySubscription.unsubscribe();
    this.thirdColumnQtySubscription.unsubscribe();
  }
  onDropTwitterUserPostsEv(event: {previousIndex: number, currentIndex: number}) {
    const {previousIndex, currentIndex} = event;
    this.store.dispatch(new SwitchTwitterPosts({previousIndex, currentIndex}));
    this.postService.changeTwitterColumnsData(event);
  }
  private modifyColumnQty(index: number) {
    return (value: number) => {
      if (value) {
        this.store.dispatch(new ModifyTwitterPostsQty({index, value}));
      }
    };
  }
}
