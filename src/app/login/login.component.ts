import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessagesService } from '../shared/services/messages.service';
import { AuthMDBService } from './../shared/services/auth-mdb.service';
import { mergeMap, take } from 'rxjs/operators';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { username: 'xrust', password: '230582' };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService,
    private dbService: AuthMDBService
  ) {}

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/users']);
    }
    this.getFirstTokenForLogin();
  }

  login() {
    this.errorMessage = '';

    this.authService
      .login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${
              this.credentials.username
            }, Вы успешно вошли в систему. Добро пожаловать!`
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

  regForm() {
    this.router.navigate(['/registration']);
  }

  // ******************** new login *****************************************************//

  getFirstTokenForLogin() {
    this.dbService.getFirstToken().subscribe(firstToken => {
      this.dbService
        .getSecondTokenForLOgin(
          firstToken,
          this.credentials.username,
          this.credentials.password
        )
        .subscribe(secondToken => this.getSessionId(secondToken));
    });
  }
  getSessionId(token) {
    if (token.success) {
      this.dbService
        .getSessionID(token.request_token)
        .subscribe(keySessionId => this.getUserInfo(keySessionId));
    }
  }

  getUserInfo(sessionID) {
    this.dbService
      .getUserInfoService(sessionID)
      .subscribe(infoUser => console.log(infoUser));
  }
}
