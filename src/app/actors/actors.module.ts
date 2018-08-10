import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorsRoutingModule } from './actors-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';

import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorsComponent } from './actors.component';
import { ActorCardComponent } from './actor-card/actor-card.component';
import { ActorItemComponent } from './actor-list/actor-item/actor-item.component';

// import { ActorsService } from './../shared/actors.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ActorsRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    ActorListComponent,
    ActorItemComponent,
    ActorsComponent,
    ActorCardComponent
  ],
  exports: [
    ActorListComponent,
    ActorItemComponent,
    ActorsComponent,
    ActorCardComponent
  ],
  // providers: [ActorsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActorsModule {}
