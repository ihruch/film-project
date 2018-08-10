import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MessagesService } from './../shared/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {}

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/main']);
    }
  }

  login() {
    this.authService
      .login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `Добро пожаловать ${
              this.credentials.username
            }, Вы успешно вошли в систему.`
          });
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 2000);
        },

        err => {
          this.errorMessage = err.error.error;
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      );
  }
}
/*
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {MessagesService} from '../shared/services/messages.service';


export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/users']);
    }

  }

  login() {
    this.errorMessage = '';

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.credentials.username}, Вы успешно вошли в систему. Добро пожаловать!`
          });
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        err => {
          this.errorMessage = err.error.error;
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      );
  }

}

*/
