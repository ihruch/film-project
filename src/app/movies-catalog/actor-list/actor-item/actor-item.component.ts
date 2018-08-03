import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {
  @Input() actor: any;
  @Input() imgPath: string;
  constructor() {}

  ngOnInit() {
    // this.inWhichFilmActor;
  }

  actInFilms(ev) {
    let res = '';
    ev.known_for.forEach(i => {
      res += i.original_title;
    });
    return res;
  }
}
