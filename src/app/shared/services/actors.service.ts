import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class ActorsService {
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
  smallBackPath: string = `${this.imgPath}/w235_and_h235_face`;
  smallMainPage: string = `${this.imgPath}/w300_and_h450_face`;
  imgBestv2: string = `${this.imgPath}/w150_and_h225_bestv2`;

  firstResult: any;
  constructor(private http: HttpClient) {}

  getPopularActors(page?: number) {
    return this.http
      .get(`${this.personUrl}/popular?page=${page}${this.params}`)
      .pipe(
        map(x => {
          if (x['page'] === 1) {
            this.firstResult = x;
          }
          return x;
        })
      )
      .pipe(delay(1500));
  }

  searchFilmsModel(query, page) {
    return this.http.get(
      `${this.searchUrl}/person?${
        this.params
      }&query=${query}&page=${page}&include_adult=0&region=0`
    );
  }

  getPrimaryInfoActor(idActor) {
    return this.http.get(
      `${this.personUrl}/${idActor}${this.paramsKey}${this.paramsLang}`
      // https://api.themoviedb.org/3/person/500?api_key=0994e7679a856150aadcecf7de489bce&language=en-US
    );
  }
  actInfilms(idActor) {
    return this.http.get(
      `${this.personUrl}/${idActor}/movie_credits${this.paramsKey}${
        this.paramsLang
      }`
    );
  }

  sortData(arr) {
    return arr.sort((x, y) => x['sortData'] - y['sortData']);
  }
}
