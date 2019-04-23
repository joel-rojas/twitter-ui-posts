import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, forkJoin, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TwitterPosts, TwitterPostsModel } from './../../store/twitter/twitter.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseURL: string = 'http://127.0.0.1:7890/api/';
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
      }));
  }
}
