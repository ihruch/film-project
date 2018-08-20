import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FilmsService } from '../../shared/services/films.service';
import { forkJoin, Observable } from 'rxjs';
import { delay, tap, switchMap, map, mergeMap } from 'rxjs/operators';

import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';

class IDescrFilm {
  adult: Boolean;
  backdrop_path: any;
  belongs_to_collection: any;
  budget: any;
  genres: object[];
  homepage: String;
  id: Number;
  imdb_id: any;
  original_language: any;
  original_title: String;
  overview: String;
  popularity: Number;
  poster_path: String;
  production_companies: object[];
  production_countries: object[];
  release_date: String;
  revenue: any;
  runtime: any;
  spoken_languages: object[];
  status: String;
  tagline: String;
  title: String;
  video: any;
  vote_average: number;
  vote_count: number;
}
class IVideoFilm {
  id: Number;
  results: object[];
}
class ICharactersFilm {
  cast: object[];
  crew: object[];
  id: number;
}
class ISimilarFilm {
  page: number;
  results: object[];
  total_pages: number;
  total_results: number;
}

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {
  idFilm: string;

  dataDescriptionFilm: any;
  dataVideosFilm: any;
  dataCharactersFilm: any;
  dataSimilarFilm: any;

  urlImgFilm = this.filmsService.smallMainPage;
  imgBGI = this.filmsService.bigBackPath;
  urlImgPortret;
  sizeRat = 72;
  vote = 0;

  @ViewChild('modalWin')
  modalWin: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.modalWin.nativeElement.style.display = 'block';
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idFilm = params.get('id');
    });

    const dataStream = forkJoin(
      this.filmsService.getPrimaryInfoFilm(this.idFilm),
      this.filmsService.getVideosSingleFilm(this.idFilm),
      this.filmsService.getCastForFilm(this.idFilm),
      this.filmsService.getSimilarFilms(this.idFilm)
    )
      .pipe(delay(2 * 1000))
      .subscribe(data => {
        [
          this.dataDescriptionFilm,
          this.dataVideosFilm,
          this.dataCharactersFilm,
          this.dataSimilarFilm
        ] = data;
        this.modalWin.nativeElement.style.display = '';
        console.log(this.dataDescriptionFilm);
      });
  }

  getSantizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
