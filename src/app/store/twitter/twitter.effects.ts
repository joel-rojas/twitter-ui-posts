import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, zip, Observable } from 'rxjs';
import { AppState } from './../index';
import { switchMap, map, catchError, tap, take } from 'rxjs/operators';
import { ApiService } from './../../services/api/api.service';
import { LayoutData } from './../../services/local-data/layout-data.config';
import { PostService } from './../../services/ui/post.service';
import { LoadTwitterPosts,
  TwitterActionTypes,
  TwitterPostsLoaded,
  TwitterPostsLoadingError,
  ReOrderTwitterPosts,
  NoOpTwitterPosts } from './twitter.actions';
import { TwitterPosts, TwitterUser } from './twitter.model';


@Injectable()
export class TwitterEffects {

  @Effect()
    loadTwitterPosts$ = this.actions$.pipe(
      ofType(TwitterActionTypes.LoadTwitterPosts),
      switchMap((action: LoadTwitterPosts) =>
        this.apiService.fetchTwitterUsersData().pipe(
          tap((twitterPosts: TwitterPosts[]) => this.store.dispatch(new TwitterPostsLoaded({twitterPosts}))),
          switchMap(() =>
            zip(this.postService.filledUsersPosts$, this.postService.filledLayoutData$.pipe(take(1))).pipe(
              map(([twitterUsers, dataStorage]) => of({twitterUsers, dataStorage}))
          )),
          switchMap((latestData: Observable<{twitterUsers: TwitterUser[], dataStorage: LayoutData}>) =>
            latestData.pipe(map(data => {
              const {twitterUsers, dataStorage} = data;
              const {twitterColumns} = dataStorage;
              const isSameTwitterPostsOrder = this.postService.isSameTwitterPostsOrderByStorage(twitterColumns, twitterUsers);
              if (!isSameTwitterPostsOrder) {
                this.postService.setReOrderedSelectors(twitterColumns);
                return new ReOrderTwitterPosts({twitterColumns});
              }
              return new NoOpTwitterPosts();
            }))
          ),
          catchError((error) => of(new TwitterPostsLoadingError()))
        )
      ),
    );

  constructor(private apiService: ApiService,
              private postService: PostService,
              private store: Store<AppState>,
              private actions$: Actions) {}

}
