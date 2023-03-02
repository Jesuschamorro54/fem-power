import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  constructor() { }

  sponsors = [
    {name: 'Bancolombia', url: 'https://cdn-images-1.medium.com/max/1200/1*gCjUaiR21GqmGlk0U5Lgkw.png'},
    {name: 'Amazon', url: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg'},
    {name: 'Colechera', url: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0018/1571/brand.gif?itok=vA2O8Wyc'},
    {name: 'Air-e', url: 'https://aire-energia.com/wp-content/uploads/2021/05/customcolor_logo_transparent_background.png'},
    {name: 'Unilibre', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Escudo_de_la_Universidad_Libre_de_Colombia.svg/1200px-Escudo_de_la_Universidad_Libre_de_Colombia.svg.png'},
    
  ]

  ngOnInit(): void {
  }

}
