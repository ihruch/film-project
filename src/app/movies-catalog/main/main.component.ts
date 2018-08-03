import { Component, OnInit } from '@angular/core';
import { FilmsService } from './../services/films.service';
import { ActorsService } from './../services/actors.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  fourFilms$: Observable<object>;
  fourActors$: Observable<object>;
  urlImgFilm = this.filmsService.smallMainPage;
  urlImgActor = this.actorsService.smallMainPage;

  constructor(
    private filmsService: FilmsService,
    private actorsService: ActorsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fourFilms$ = this.filmsService
      .getPopularFilms()
      .pipe(map(x => x['results']))
      .pipe(map(x => x.slice(0, 4)));

    this.fourActors$ = this.actorsService
      .getPopularActors()
      .pipe(map(x => x['results']))
      .pipe(map(x => x.slice(0, 4)));
    this.fourActors$.subscribe(i => console.log(i))
  }
  moveToFilms() {
    this.router.navigate(['/films']);
  }
  moveToActors() {
    this.router.navigate(['/actors']);
  }
  actInFilms(ev) {
    let res = '';
    ev.known_for.forEach(i => {
      res += i.original_title;
    });
    return res;
  }
}
