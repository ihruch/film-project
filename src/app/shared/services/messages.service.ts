import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessages } from './../models/massage.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private message$ = new Subject<IMessages>();
  private submit$ = new Subject<Boolean>();

  constructor() {}

  getMessages() {
    return this.message$.asObservable();
  }
  setMessage(msg) {
    this.message$.next(msg);
  }

  submit(confirmation = true) {
    this.submit$.next(confirmation);
  }

  getSubmit() {
    return this.submit$.asObservable();
  }
}
