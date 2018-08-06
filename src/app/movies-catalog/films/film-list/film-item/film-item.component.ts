import { Component, OnInit, Input } from '@angular/core';
import { IFilm } from './../../../models/film.interface';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: IFilm;
  @Input() imgPath: String;
  sizeRat = 38;
  isTrue = true;

  constructor() {}

  ngOnInit() {}
}
