import { Component, OnInit } from '@angular/core';
import { IMessages } from './../shared/models/massage.interface';
import { MessagesService } from './../shared/services/messages.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  isShow = false;
  message: IMessages;

  constructor(private msgService: MessagesService) {}

  ngOnInit() {
    this.msgService.getMessages().subscribe((msg: IMessages) => {
      this.message = msg;
      this.isShow = true;
      if (!msg.action) {
        setTimeout(() => (this.isShow = false), 4000);
      }
    });
  }

  submit() {
    this.isShow = false;
    this.msgService.submit();
  }

  close() {
    this.isShow = false;
    this.msgService.submit(false);
  }
}
