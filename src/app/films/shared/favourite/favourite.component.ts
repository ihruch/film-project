import { Component, OnInit } from '@angular/core';
import { AuthMDBService } from './../../../shared/services/auth-mdb.service';
import { FilmsService } from './../../../shared/services/films.service';
import { IFilm } from './../models/film';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  result: IFilm[];
  imgPath = this.filmsService.smallImgPath;

  constructor(
    private dbService: AuthMDBService,
    private filmsService: FilmsService
  ) {
    this.dbService.getChangeMessage().subscribe(x => this.getFavouriteFilms());
  }

  ngOnInit() {
    this.getFavouriteFilms();
  }

  getFavouriteFilms() {
    this.dbService.getFavouriteList().subscribe(item => {
      this.result = item;
    });
  }

  trackByFn(index, item) {
    return index; // or item.id
  }
}
