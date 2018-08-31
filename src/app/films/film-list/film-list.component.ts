import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FilmsService } from '../../shared/services/films.service';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

import { MatPaginator, PageEvent } from '@angular/material';
import { AuthMDBService } from './../../shared/services/auth-mdb.service'
@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  resultFilms = [];

  imgPath = this.filmsService.smallImgPath;

  // imgPath = this.filmsService.smallBackPath; для показа 3-ч карточек в рядок  backdrop_path
  queryStr: string;
  isTrue = true;
  isVisible = false;
  configPage = {
    currentPage: 1,
    totalPages: null,
    totalResults: null,
    lastPage: null
  };

  // MatPaginator Inputs
  lengthPag = null;
  pageSizePag = 20;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild('modalWin', { read: ElementRef })
  modalWin: ElementRef;

  constructor(
    private filmsService: FilmsService,
    private  dbServices: AuthMDBService
  ) {}

  saveData(result, page, totalPage, totalResult) {
    this.resultFilms = result;
    this.configPage.currentPage = page;
    this.configPage.totalPages = totalPage;
    this.configPage.totalResults = totalResult;
    this.lengthPag = totalResult;
  }

  ngOnInit() {
    this.getDatafilms();
    this.modalWin.nativeElement.style.display = 'block';

    setTimeout(() => {
      this.modalWin.nativeElement.style.display = '';
    }, 1500);
  }

  getDatafilms() {
    this.filmsService
      .getPopularFilms(this.configPage.currentPage)
      .subscribe(filmList => {
        this.saveData(
          filmList['results'],
          filmList['page'],
          filmList['total_pages'],
          filmList['total_results']
        );
      });
  }

  searchFilms(querySearch) {
    console.log(querySearch);
    this.queryStr = querySearch;
    this.configPage.currentPage = 1;
    this.paginator.firstPage();
    this.handlerSearchFilm();
  }

  handlerSearchFilm() {
    if (this.queryStr.length >= 3) {
      this.filmsService
        .searchFilms(this.queryStr, this.configPage.currentPage)
        .subscribe(resSearch => {
          console.log(resSearch);

          if (resSearch['total_results']) {
            this.saveData(
              resSearch['results'],
              resSearch['page'],
              resSearch['total_pages'],
              resSearch['total_results']
            );
          } else {
            this.isVisible = true;
          }
        });
    }
  }

  clearSearchStr() {
    if (this.filmsService.firstResult['results'].length) {
      this.saveData(
        this.filmsService.firstResult['results'],
        this.filmsService.firstResult['page'],
        this.filmsService.firstResult['total_pages'],
        this.filmsService.firstResult['total_results']
      );
      this.queryStr = '';
      this.paginator.firstPage();

      this.isVisible = false;
    }
  }

  handlerClick(event) {
    const btn = event.target.closest('button');
    btn.disabled = true;
    this.modalWin.nativeElement.style.display = 'block';

    this.configPage.currentPage = this.pageEvent.pageIndex + 1;
    this.queryStr ? this.handlerSearchFilm() : this.getDatafilms();
    setTimeout(() => {
      btn.disabled = '';
      this.modalWin.nativeElement.style.display = '';
    }, 1500);
  }

}
