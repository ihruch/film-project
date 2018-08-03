import { InjectionToken } from '@angular/core';
import { IConfig } from './../models/config.interface';

export const configUrl = {
  apiUrl: 'https://api.themoviedb.org/3',
  apiKey: '0994e7679a856150aadcecf7de489bce',
  movieUrl: () => {
    return `${this.apiUrl}/movie`;
  },
  searchUrl: () => {
    return `${this.apiUrl}/search`;
  },
  personUrl: () => {
    return `${this.apiUrl}/person`;
  },
  params: () => {
    return `&api_key=${this.apiKey}&language=ru-RU`;
  },

  imgPath: 'https://image.tmdb.org/t/p',
  midImgPath: () => {
    return `${this.imgPath}/w500`;
  },
  smallImgPath: () => {
    return `${this.imgPath}/w185`;
  },
  bigBackPath: () => {
    return `${this.imgPath}/w1280`;
  },
  midBackPath: () => {
    return `${this.imgPath}/w780`;
  },
  smallBackPath: () => {
    return `${this.imgPath}/w300`;
  }
};

export const CONFIG_URL = new InjectionToken<IConfig>('urlInfo');
