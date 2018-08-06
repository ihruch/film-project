import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../material.module';
import { FilmsRoutingModule } from './films-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FilmsComponent } from './films.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmItemComponent } from './film-list/film-item/film-item.component';
import { StatusIconComponent } from './film-list/film-item/status-icon/status-icon.component';

import { FilmCardComponent } from './film-card/film-card.component';
import { SearchComponent } from './../search/search.component';

import { FilmsService } from './../services/films.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FilmsRoutingModule,
    FormsModule
  ],
  declarations: [
    FilmsComponent,
    FilmListComponent,
    FilmItemComponent,
    StatusIconComponent,
    SearchComponent,
    FilmCardComponent
  ],
  exports: [
    FilmsComponent,
    FilmListComponent,
    FilmItemComponent,
    StatusIconComponent,
    SearchComponent,
    FilmCardComponent
  ],
  providers: [FilmsService]
})
export class FilmsModule {}
