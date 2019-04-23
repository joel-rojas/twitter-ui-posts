import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ApiService } from './../../services/api/api.service';
import { LoadTwitterPosts, TwitterActionTypes, TwitterPostsLoaded } from './twitter.actions';
import { TwitterPosts } from './twitter.model';


@Injectable()
export class TwitterEffects {

  @Effect()
    loadTwitterPosts = this.actions$.pipe(
      ofType(TwitterActionTypes.LoadTwitterPosts),
      switchMap((action: LoadTwitterPosts) => {
        return this.apiService.fetchTwitterUsersData().pipe(
          map((twitterPosts: TwitterPosts[]) => {
            return new TwitterPostsLoaded({twitterPosts});
          })
        );
      })
    );

  constructor(private apiService: ApiService, private actions$: Actions) {}

}
