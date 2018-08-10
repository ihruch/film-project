import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  links: object[] = [
    {
      path: '/main',
      label: 'Главная',
      active: 'button-active',
      icon: 'home'
    },
    {
      path: '/films',
      label: 'Фильмы',
      active: 'button-active',
      icon: 'format_list_bulleted'
    },
    {
      path: '/actors',
      label: 'Актеры',
      active: 'button-active',
      icon: 'recent_actors'
    }
  ];
  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    if (this.authService.isLoggedIn()) {
      console.log('logout');
      this.authService.logout();

      this.router.navigate(['/login']);
    }
  }
}
