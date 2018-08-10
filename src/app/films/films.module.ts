import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../shared/material.module';
import { SharedModule } from './../shared/shared.module';
import { FilmsRoutingModule } from './films-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FilmsComponent } from './films.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmItemComponent } from './film-list/film-item/film-item.component';
import { StatusIconComponent } from './shared/status-icon/status-icon.component';

import { FilmCardComponent } from './film-card/film-card.component';

import { FilmsService } from './../shared/services/films.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FilmsRoutingModule,
    SharedModule
  ],
  declarations: [
    FilmsComponent,
    FilmListComponent,
    FilmItemComponent,
    StatusIconComponent,
    FilmCardComponent
  ],
  exports: [
    FilmsComponent,
    FilmListComponent,
    FilmItemComponent,
    StatusIconComponent,
    FilmCardComponent
  ],
  providers: [FilmsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilmsModule {}
