import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActorsComponent } from './actors.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorCardComponent } from './actor-card/actor-card.component';

const routes: Routes = [
  {
    path: '',
    component: ActorsComponent,
    children: [
      {
        path: '',
        component: ActorListComponent
      },
      {
        path: ':id',
        component: ActorCardComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule {}
