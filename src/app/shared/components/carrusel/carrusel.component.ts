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
  currentPosition = 0;
  maxPosition = (285 * this.items.length) - 570;

  constructor() { }


  prev() {
    if (this.currentPosition > 0) {
      this.currentPosition -= 428;
      this.moveCarousel();
    }
  }

  next() {
    if (this.currentPosition < this.maxPosition) {
      this.currentPosition += 428;
      this.moveCarousel();
    }
  }

  moveCarousel() {
    const carouselWrapper: any = document.querySelector('.carousel-wrapper');
    carouselWrapper.style.transform = `translateX(-${this.currentPosition}px)`;
    this.checkButtons();
  }

  checkButtons() {

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    if (this.currentPosition <= 0) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }
    if (this.currentPosition >= this.maxPosition) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
  }
}
