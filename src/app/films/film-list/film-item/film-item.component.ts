import { Component, OnInit, Input, Output } from '@angular/core';
import { IFilm } from './../../shared/models/film';
import { AuthMDBService } from './../../../shared/services/auth-mdb.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input()
  film: IFilm;
  @Input()
  imgPath: String;
  sizeRat = 38;
  isTrue = true;
  statusIcon: boolean = false;
  status_message: string = '';

  constructor(private dbService: AuthMDBService) {}

  ngOnInit() {
    this.isFavouriteFilm();
  }

  addToFavoriteList(filmID) {
    this.dbService.addToFavouriteItemList(filmID).subscribe(resopnce => {
      if (resopnce['status_message'] === 'Success.') {
        console.log('Success');
        this.statusIcon = true;
      }
    });
  }

  isFavouriteFilm() {
    this.dbService.getFavouriteList().subscribe((data: IFilm[]) => {
      // console.log(data);
      const favouriteFiml = data.find(
        (item: IFilm) => item['id'] === this.film['id']
      );
      if (favouriteFiml) {
        this.statusIcon = true;
      }
    });
  }

  addFavourite(filmID) {
    if (this.statusIcon) {
      this.dbService.addToFavouriteItemList(filmID, false).subscribe(x => {
        this.dbService.setChangeMessage(x['status_message']);
        console.log((x['status_message']);
        this.statusIcon = false;
      });
    } else {
      this.dbService.addToFavouriteItemList(filmID).subscribe(x => {
        this.dbService.setChangeMessage(x['status_message']); 
        console.log((x['status_message']);
        this.statusIcon = true;
      });
    }
  }
}
