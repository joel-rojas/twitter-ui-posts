import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TwitterPosts } from './../../store/twitter/twitter.model';
// import { environment } from '../../../environments/environment.prod';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public readonly baseURL = environment.api.baseURL;
  constructor(private http: HttpClient) { }
  fetchTwitterUsersData(): Observable<TwitterPosts[]|object> {
    const url = `${this.baseURL}twitter/tweets`;
    return this.http.get(url).pipe(
      catchError(err => throwError(err))
    );
  }
}
