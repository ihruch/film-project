import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { FilmListComponent } from './film-list/film-list.component';
import { FilmItemComponent } from './film-list/film-item/film-item.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorItemComponent } from './actor-list/actor-item/actor-item.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from './../../app/material.module';

import { FilmsService } from './services/films.service';
import { ActorsService } from './services/actors.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    FilmListComponent,
    FilmItemComponent,
    ActorListComponent,
    ActorItemComponent,
    MainComponent,
    SearchComponent
  ],
  exports: [
    FilmListComponent,
    FilmItemComponent,
    ActorListComponent,
    ActorItemComponent,
    MainComponent,
    SearchComponent
  ],
  providers: [FilmsService, ActorsService]
})
export class MoviesCatalogModule {}
