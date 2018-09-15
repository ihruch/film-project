import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, tap, retry } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthMDBService {
  mainURL = 'https://api.themoviedb.org/3/';
  keyAPI = 'd73711f75d852eb912c0d4955eb96e08';
  block_keyAPI = `api_key=${this.keyAPI}`;
  userId: number;
  sessionID: string;
  private loggedIn = false;
  private subject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('session_id');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setChangeMessage(msg) {
    this.subject.next(msg);
  }

  getChangeMessage() {
    return this.subject.asObservable();
  }

  getFirstToken() {
    return this.http
      .get(`${this.mainURL}authentication/token/new?${this.block_keyAPI}`)
      .pipe(pluck('request_token'));
  }

  getSecondTokenForLOgin(firstTOken, user, passw) {
    return this.http.get(
      `${
        this.mainURL
      }authentication/token/validate_with_login?username=${user}&password=${passw}&request_token=${firstTOken}&${
        this.block_keyAPI
      }`
    );
  }

  getSessionID(token) {
    return this.http
      .get(
        `${this.mainURL}authentication/session/new?${
          this.block_keyAPI
        }&request_token=${token}`
      )
      .pipe(
        pluck('session_id'),
        tap((sessionID: string) => {
          console.log('sessionID - ', sessionID);
          localStorage.setItem('session_id', sessionID);
        })
      );
  }

  getUserInfoService(sessionID) {
    return this.http
      .get(
        `${this.mainURL}account?${this.block_keyAPI}&session_id=${sessionID}`
      )
      .pipe(tap(userId => (this.userId = userId['id'])));
  }

  addToFavouriteItemList(filmID, isTrue = true) {
    const body = {
      media_type: 'movie',
      media_id: filmID,
      favorite: isTrue
    };
    this.sessionID = localStorage.getItem('session_id');
    return this.http.post(
      `${this.mainURL}account/${this.userId}/favorite?${
        this.block_keyAPI
      }&session_id=${this.sessionID}`,
      body
    );
  }

  getFavouriteList() {
    // const sessionID = localStorage.getItem('session_id');
    return this.http
      .get(
        `${this.mainURL}account/${this.userId}/favorite/movies?${
          this.block_keyAPI
        }&session_id=${this.sessionID}`
      )
      .pipe(pluck('results'));
  }

  deleteFromFavouriteLIst(filmID) {}

  logout() {
    const id = localStorage.getItem('session_id');
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const body: any = JSON.stringify({
      session_id: id
    });

    return this.http.delete(
      `${this.mainURL}authentication/session?${this.block_keyAPI}`,
      body
    );
  }
}

// export class AuthService {
//   private authUrl = 'https://reqres.in/api';
//   private loggedIn = false;

//   constructor(private http: HttpClient) {
//     this.loggedIn = !!localStorage.getItem('auth_token');
//   }

//   isLoggedIn() {
//     return this.loggedIn;
//   }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(`${this.authUrl}/login`, { username, password }).pipe(
  //     retry(2),
  //     tap(res => {
  //       if (res.token) {
  //         localStorage.setItem('auth_token', res.token);
  //         this.loggedIn = true;
  //       }
  //     })
  //   );
  // }

