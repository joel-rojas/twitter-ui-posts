import { PostService } from './../../services/ui/post.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './../../services/api/api.service';
import { AppState } from './../../store';
import { LoadTwitterPosts, SwitchTwitterPosts } from './../../store/twitter/twitter.actions';
import { TwitterPosts } from './../../store/twitter/twitter.model';
import { selectTwitterPostsByUser } from './../../store/twitter/twitter.selectors';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-tw-posts',
  templateUrl: './tw-posts.component.html',
  styleUrls: ['./tw-posts.component.css']
})
export class TwPostsComponent implements OnInit, AfterViewInit, OnDestroy {
  public orderColumnSubscription: Subscription;
  public orderColumnSwitchSubject: BehaviorSubject<MatSlideToggleChange>;
  public enableOrderColumn = false;
  public userPosts$: Observable<Array<{id: number, user: string, posts: TwitterPosts[]}>>;
  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private postService: PostService) {
      this.userPosts$ = this.store.pipe(select(selectTwitterPostsByUser));
      this.orderColumnSwitchSubject = this.postService.orderColumnSwitchSubject;
    }

  ngOnInit() {
    this.store.dispatch(new LoadTwitterPosts());
  }
  ngAfterViewInit() {
    this.orderColumnSubscription = this.orderColumnSwitchSubject.subscribe(value => {
      this.enableOrderColumn = value ? value.checked : false;
    });
  }
  ngOnDestroy() {
    this.orderColumnSubscription.unsubscribe();
  }
  onDropTwitterUserPostsEv(event) {
    const {previousIndex, currentIndex} = event;
    this.store.dispatch(new SwitchTwitterPosts({previousIndex, currentIndex}));
  }
}
