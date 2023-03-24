import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent {
  @ViewChild('carrusel') carrusel: ElementRef;
  @ViewChild('carruselItems') carruselItems: ElementRef;
  items = [
    {
      image: 'https://www.vanguardia.com/binrepository/715x477/0c0/716d477/none/12204/TNMQ/ayuda_6498652_20211220204710.jpg',
      title: 'Desarrollo de cultivo de platano'
    },
    {
      image: 'https://www.vanguardia.com/binrepository/1200x1600/0c629/1200d628/upper-right/12204/QJRS/wayuu_6493125_20211220203931.jpg',
      title: 'Desarrollo de cultivo de platano'
    },
    {
      image: 'https://www.paho.org/sites/default/files/2021-08/taller-violencia-intrafamiliar.jpg',
      title: 'Desarrollo de cultivo de platano'
    },
    {
      image: 'https://www.usfq.edu.ec/sites/default/files/inline-images/diversidad-7.jpg',
      title: 'Desarrollo de cultivo de platano'
    },];

  constructor() {}

  next(): void {
    this.move(-1);
  }

  prev(): void {
    this.move(1);
  }

  private move(direction: number): void {
    const step = this.carrusel.nativeElement.offsetWidth / 3;
    const movement = direction * step;
    const currentPosition = this.carruselItems.nativeElement.style.transform.replace('translateX(', '').replace('px)', '') || '0';
    const newPosition = parseInt(currentPosition, 10) + movement;
    this.carruselItems.nativeElement.style.transform = `translateX(${newPosition}px)`;
  }
}
