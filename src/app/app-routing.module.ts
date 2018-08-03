import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './movies-catalog/main/main.component';
import { FilmListComponent } from './movies-catalog/film-list/film-list.component';
import { ActorListComponent } from './movies-catalog/actor-list/actor-list.component';


const router: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent },
  { path: 'films', component: FilmListComponent },
  { path: 'actors', component: ActorListComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
