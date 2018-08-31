import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CanDeactivateGuard } from './shared/guards/can-deativate-guard.service';
import { AuthGuard } from './shared/guards/auth-guard.service';

const router: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent, canDeactivate: [CanDeactivateGuard] },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'films',
    loadChildren: './films/films.module#FilmsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'actors',
    loadChildren: './actors/actors.module#ActorsModule',
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
