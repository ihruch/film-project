import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FilmsService } from '../../shared/films.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {
  idFilm: string;
  confimFilm = {
    descrFilm: null,
    videosFilm: null,
    charactersFilm: null,
    similarFilm: null
  };

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idFilm = params.get('id');
    });

    const dataStream = forkJoin(
      this.filmsService.getPrimaryInfoFilm(this.idFilm),
      this.filmsService.getVideosSingleFilm(this.idFilm),
      this.filmsService.getCastForFilm(this.idFilm),
      this.filmsService.getSimilarFilms(this.idFilm)
    );
    dataStream.subscribe(data => {
      console.log(data);
      [
        this.confimFilm.descrFilm,
        this.confimFilm.videosFilm,
        this.confimFilm.charactersFilm,
        this.confimFilm.similarFilm
      ] = data;
    });
  }
}
