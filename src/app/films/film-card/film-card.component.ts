import { Component, OnInit } from '@angular/core';
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

  urlImgFilm = this.filmsService.smallMainPage; // backdrop_path
  imgBGI = this.filmsService.bigBackPath;
  urlImgPortret;
  sizeRat = 72;
  vote = 0;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private sanitizer: DomSanitizer
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
    )
      .pipe(delay(2 * 1000))
      .subscribe(data => {
        // console.log(data[0]);
        // console.log(data[1]);
        console.log(data[2]);
        // console.log(data[3]);

        [
          this.dataDescriptionFilm,
          this.dataVideosFilm,
          this.dataCharactersFilm,
          this.dataSimilarFilm
        ] = data;

        console.log(this.dataDescriptionFilm);
      });
    // const s1$ = this.filmsService.getPrimaryInfoFilm(this.idFilm);
    // const s2$ = this.filmsService.getVideosSingleFilm(this.idFilm);

    // const s3$ = this.filmsService.getCastForFilm(this.idFilm);
    // const s4$ = this.filmsService.getSimilarFilms(this.idFilm);

    // s1$
    //   .pipe(
    //     mergeMap(val1 => {
    //       this.dataDescriptionFilm = val1;
    //       return s2$.pipe(
    //         map(val2 => {
    //           this.dataVideosFilm = val2;
    //           return val2;
    //         })
    //       );
    //     })
    //   )
    //   .subscribe(x => x);

    // s3$
    //   .pipe(
    //     mergeMap(val3 => {
    //       this.dataCharactersFilm = val3;
    //       return s4$.pipe(
    //         map(val4 => {
    //           this.dataSimilarFilm = val4;
    //           return val4;
    //         })
    //       );
    //     })
    //   )
    //   .subscribe(x => console.log(x));
  }

  getSantizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
// this.urlImgPortret = this.sanitizer.bypassSecurityTrustResourceUrl(
//   `https://image.tmdb.org/t/p/w1280${
//     this.dataDescriptionFilm.backdrop_path
//   }`
// );
// ------------------------уточнить какой способ работает быстрее.------------------------
// const dataStream = forkJoin(
//   this.filmsService.getPrimaryInfoFilm(this.idFilm),
//   this.filmsService.getVideosSingleFilm(this.idFilm),
//   this.filmsService.getCastForFilm(this.idFilm),
//   this.filmsService.getSimilarFilms(this.idFilm)
// )
//   .pipe(delay(2 * 1000))
//   .subscribe(data => {
//     console.log(data[0]);
//     console.log(data[1]);
//     console.log(data[2]);
//     console.log(data[3]);

//     [
//       this.dataDescriptionFilm,
//       this.dataVideosFilm,
//       this.dataCharactersFilm,
//       this.dataSimilarFilm
//     ] = data;

//     console.log(this.dataCharactersFilm.cast);
//   });
// }
