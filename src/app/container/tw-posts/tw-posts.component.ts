import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from './../../services/api/api.service';
import { AppState } from './../../store';
import { LoadTwitterPosts } from './../../store/twitter/twitter.actions';
import { TwitterPosts } from './../../store/twitter/twitter.model';
import { selectTwitterPostsByUser } from './../../store/twitter/twitter.selectors';

@Component({
  selector: 'app-tw-posts',
  templateUrl: './tw-posts.component.html',
  styleUrls: ['./tw-posts.component.css']
})
export class TwPostsComponent implements OnInit {
  public title = 'Fetching Data...';
  public userPosts$: Observable<Array<{id: number, user: string, posts: TwitterPosts[]}>>;
  constructor(
    private store: Store<AppState>,
    private apiService: ApiService) {
      this.userPosts$ = this.store.pipe(select(selectTwitterPostsByUser));
    }

  ngOnInit() {
    this.store.dispatch(new LoadTwitterPosts());
  }
}
