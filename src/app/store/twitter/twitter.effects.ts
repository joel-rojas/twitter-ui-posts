import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ApiService } from './../../services/api/api.service';
import { LoadTwitterPosts, TwitterActionTypes, TwitterPostsLoaded, TwitterPostsLoadingError } from './twitter.actions';
import { TwitterPosts } from './twitter.model';


@Injectable()
export class TwitterEffects {

  @Effect()
    loadTwitterPosts = this.actions$.pipe(
      ofType(TwitterActionTypes.LoadTwitterPosts),
      switchMap((action: LoadTwitterPosts) =>
        this.apiService.fetchTwitterUsersData().pipe(
          map((twitterPosts: TwitterPosts[]) => new TwitterPostsLoaded({twitterPosts})),
          catchError((error) => of(new TwitterPostsLoadingError({error})))
        )
      )
    );

  constructor(private apiService: ApiService, private actions$: Actions) {}

}
