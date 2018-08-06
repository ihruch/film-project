import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorItemComponent } from './actor-list/actor-item/actor-item.component';
import { MainComponent } from './main/main.component';

import { SearchComponent } from './search/search.component';
import { MaterialModule } from './../../app/material.module';

import { FilmsService } from './services/films.service';
import { ActorsService } from './services/actors.service';
import { FormsModule } from '@angular/forms';
import { FilmsModule } from './films/films.module';
@NgModule({
  imports: [CommonModule, HttpClientModule, MaterialModule, FilmsModule],
  declarations: [
    ActorListComponent,
    ActorItemComponent,
    MainComponent
    // SearchComponent,
  ],
  exports: [
    ActorListComponent,
    ActorItemComponent,
    MainComponent
    // SearchComponent,
  ],
  providers: [FilmsService, ActorsService]
})
export class MoviesCatalogModule {}
