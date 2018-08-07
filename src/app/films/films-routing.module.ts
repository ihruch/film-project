import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmsComponent } from './films.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmCardComponent } from './film-card/film-card.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsComponent,
    children: [
      {
        path: '',
        component: FilmListComponent
      },
      {
        path: ':id',
        component: FilmCardComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule {}
