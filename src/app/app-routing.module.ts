import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './movies-catalog/main/main.component';
import { ActorListComponent } from './movies-catalog/actor-list/actor-list.component';

const router: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent },
  {
    path: 'films',
    loadChildren: './movies-catalog/films/films.module#FilmsModule'
  },
  { path: 'actors', component: ActorListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
