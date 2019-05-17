import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, zip, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TwitterPosts, TwitterPostsModel } from './../../store/twitter/twitter.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseURL = environment.api.baseURL;
  readonly twitterUsers: string[] = [...this.twitterPostModel.twitterUsers];
  constructor(private http: HttpClient, private twitterPostModel: TwitterPostsModel) { }
  fetchTwitterUsersData(): Observable<TwitterPosts[]> {
    const twitterUsersAPICalls: Observable<TwitterPosts[]>[] = this.twitterUsers.map(user => {
      const url = `${this.baseURL}twitter/tweets/${user}`;
      return this.http.get(url).pipe(
        catchError(err => of(err))
      );
    });
    const [first, second, third] = twitterUsersAPICalls;
    return zip(first, second, third).pipe(
      map(([firstUser, secondUser, thirdUser]) => {
        return [...firstUser, ...secondUser, ...thirdUser];
      }),
      catchError((err) => throwError(err))
    );
  }
}
