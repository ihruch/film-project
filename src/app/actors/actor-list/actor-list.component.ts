import { Component, OnInit, ViewChild } from '@angular/core';
import { ActorsService } from '../../shared/services/actors.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
  resultActors = [];
  imgPath = this.actorsService.smallBackPath;

  configPage = {
    currentPage: 1,
    totalPages: null,
    totalResults: null,
    lastPage: null
  };
  queryStr: string;
  isTrue = true;
  isVisible = false;

  // MatPaginator Inputs
  lengthPag = null;
  pageSizePag = 20;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private actorsService: ActorsService) {}

  saveData(result, page, totalPage, totalResult) {
    this.resultActors = result;
    this.configPage.currentPage = page;
    this.configPage.totalPages = totalPage;
    this.configPage.totalResults = totalResult;
    this.lengthPag = totalResult;
  }

  ngOnInit() {
    this.getDataActors();
  }

  getDataActors() {
    this.actorsService
      .getPopularActors(this.configPage.currentPage)
      .subscribe(actorsList => {
        console.log(actorsList);
        this.saveData(
          actorsList['results'],
          actorsList['page'],
          actorsList['total_pages'],
          actorsList['total_results']
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
      this.actorsService
        .searchFilmsModel(this.queryStr, this.configPage.currentPage)
        .subscribe(resSearch => {
          if (resSearch['total_results']) {
            console.log('совпаденией ЕСТЬ');
            this.saveData(
              resSearch['results'],
              resSearch['page'],
              resSearch['total_pages'],
              resSearch['total_results']
            );
          } else {
            console.log('совпадения НЕТ!!');
            this.isVisible = true;
          }
        });
    }
  }

  clearSearchStr() {
    if (this.actorsService.firstResult['results'].length) {
      this.saveData(
        this.actorsService.firstResult['results'],
        this.actorsService.firstResult['page'],
        this.actorsService.firstResult['total_pages'],
        this.actorsService.firstResult['total_results']
      );
      this.queryStr = '';
      this.paginator.firstPage();
      this.isVisible = false;
    }
  }

  handlerClick() {
    this.configPage.currentPage = this.paginator.pageIndex + 1;
    this.queryStr ? this.handlerSearchFilm() : this.getDataActors();
  }
}
