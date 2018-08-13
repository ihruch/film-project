import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActorsService } from './../../shared/services/actors.service';

import { forkJoin, Observable } from 'rxjs';
import { delay, tap, switchMap, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent implements OnInit {
  idActor: string;

  dataDescriptionActor: any;
  dataPalyinFilm: any;

  urlImgActor = this.actorsService.smallMainPage;
  urlSmallImg = this.actorsService.imgBestv2; // для отображения фото картин в которых снимался актер

  @ViewChild('modalWinBiography', { read: ElementRef })
  winModal: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private actorsService: ActorsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idActor = params.get('id');

      // основные данные об актере
      this.actorsService.getPrimaryInfoActor(this.idActor).subscribe(data => {
        // console.log(data);
        this.dataDescriptionActor = data;
      });
    });

    // по каким фильмам известен
    this.actorsService.actInfilms(this.idActor).subscribe(data => {
      this.dataPalyinFilm = this.actorsService.sortData(data['cast']);
      console.log(this.dataPalyinFilm);
    });
  }

  openWin() {
    this.winModal.nativeElement.style.top = '10%';
  }
  closeWin() {
    this.winModal.nativeElement.style.top = '';
  }
}
