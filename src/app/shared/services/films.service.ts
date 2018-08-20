import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry, delay } from 'rxjs/operators';

@Injectable()
export class FilmsService {
  apiUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '0994e7679a856150aadcecf7de489bce';
  movieUrl: string = `${this.apiUrl}/movie`;
  searchUrl: string = `${this.apiUrl}/search`;
  personUrl: string = `${this.apiUrl}/person`;
  params: string = `&api_key=${this.apiKey}&language=ru-RU`;
  paramsKey: string = `?api_key=${this.apiKey}`;
  paramsLang: string = `&language=ru-RU`;

  imgPath: string = 'https://image.tmdb.org/t/p';
  midImgPath: string = `${this.imgPath}/w500`;
  smallImgPath: string = `${this.imgPath}/w185`;
  bigBackPath: string = `${this.imgPath}/w1280`;
  midBackPath: string = `${this.imgPath}/w780`;
  // smallBackPath: string = `${this.imgPath}/w300`;
  smallBackPath: string = `${this.imgPath}/w235_and_h235_face`;
  smallMainPage: string = `${this.imgPath}/w300_and_h450_face`;
  smallPortret: string = `${this.imgPath}/w138_and_h175_face`;

  firstResult: object;
  constructor(private http: HttpClient) {}

  getPopularFilms(page?: number) {
    return this.http
      .get(`${this.movieUrl}/popular?page=${page}${this.params}`)
      .pipe(
        map(x => {
          if (x['page'] === 1) {
            this.firstResult = x;
          }
          return x;
        })
      )
      .pipe(delay(1000));
  }

  searchFilms(query, page) {
    return this.http.get(
      `${this.searchUrl}/movie?${
        this.params
      }&query=${query}&page=${page}&include_adult=0&region=0`
    );
  }

  getPrimaryInfoFilm(idFilm) {
    return this.http.get(
      `${this.movieUrl}/${idFilm}${this.paramsKey}${this.paramsLang}`
    );
  }

  getVideosSingleFilm(idFilm) {
    return this.http.get(
      `${this.movieUrl}/${idFilm}/videos${this.paramsKey}${this.paramsLang}`
    );
  }

  getCastForFilm(idFilm) {
    return this.http.get(`${this.movieUrl}/${idFilm}/credits${this.paramsKey}`);
  }

  getSimilarFilms(idFilm) {
    return this.http.get(
      `${this.movieUrl}/${idFilm}/similar${this.paramsKey}${this.paramsLang}`
    );
  }
}
