import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MessagesService } from './../services/messages.service';
import { RegistrationComponent } from './../../registration/registration.component';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<RegistrationComponent> {
  constructor(private msgService: MessagesService) {}

  canDeactivate(component: RegistrationComponent): Observable<boolean> {
    if (component.editInProgress) {
      this.msgService.setMessage({
        type: 'warning',
        body: 'Вы точно хочете покинуть страницу, не сохранив изменения?',
        action: true
      });
      return this.msgService.getSubmit();
    }
    return of(true);
  }
}
