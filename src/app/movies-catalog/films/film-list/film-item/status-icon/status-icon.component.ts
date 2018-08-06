import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.css']
})
export class StatusIconComponent implements OnInit {
  @ViewChild('wrapper', { read: ElementRef })
  public wrapper: ElementRef;

  @ViewChild('canvas', { read: ElementRef })
  public canvas: ElementRef;

  @ViewChild('procent', { read: ElementRef })
  public spanProcent: ElementRef;

  @Input() ratingVote: number;
  @Input() sizeRatingIcon: number;

  procent = 0;
  oneProcent: number = 360 / 100;
  fps = 1000 / 900;
  deegres = 0;
  // sizeIcon = 38;

  constructor() {}

  ngOnInit() {
    const ctx: any = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = this.sizeRatingIcon;
    this.canvas.nativeElement.height = this.sizeRatingIcon;
    this.canvas.nativeElement.style.width = this.sizeRatingIcon + 'px';
    this.canvas.nativeElement.style.height = this.sizeRatingIcon + 'px';
    this.wrapper.nativeElement.style.width = this.sizeRatingIcon + 'px';
    this.wrapper.nativeElement.style.height = this.sizeRatingIcon + 'px';
    const radius = (this.sizeRatingIcon - 4) / 2;

    const posX = this.canvas.nativeElement.width / 2;
    const posY = this.canvas.nativeElement.height / 2;
    const vote: number = +(this.ratingVote * 10).toFixed();
    // единица времени движения 1000 - это одна секунада и делим на части
    const result = this.oneProcent * vote; // задаем величину до какого процента бежим

    ctx.lineCap = 'round';

    const acrInt = setInterval(() => {
      this.deegres += 5;

      ctx.clearRect(0, 0, this.sizeRatingIcon, this.sizeRatingIcon);

      this.procent = this.deegres / this.oneProcent;
      this.spanProcent.nativeElement.innerHTML = this.procent.toFixed();

      ctx.beginPath();
      ctx.arc(
        posX,
        posY,
        radius,
        (Math.PI / 180) * 270,
        (Math.PI / 180) * (270 + 360)
      );
      ctx.strokeStyle = '#204529';
      ctx.lineWidth = '4';
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#21d07a';
      ctx.lineWidth = '4';
      ctx.arc(
        posX,
        posY,
        radius,
        (Math.PI / 180) * 270,
        (Math.PI / 180) * (270 + this.deegres)
      );
      ctx.stroke();
      if (this.deegres >= result) {
        clearInterval(acrInt);
      }
    }, this.fps);
  } // end ngOnInit
}
