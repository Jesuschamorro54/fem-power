import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-carousel',
  templateUrl: './post-carousel.component.html',
  styleUrls: ['./post-carousel.component.scss']
})
export class PostCarouselComponent implements OnInit {

  public array_carousel: Array<any>;
  public operation: any;
  public index: number;

  constructor() { }

  ngOnInit(): void {
    this.index=0;
    this.operation= 0;
    this.array_carousel =[
      {
        project_name: "Granja aroma de mi tierra",
        img: "https://fedepanela.org.co/gremio/wp-content/uploads/2021/10/Fedepanela-Conmemora-el-Dia-Internacional-de-la-Mujer-Rural.-.jpg",
        like: 1.233
      },
      {
        project_name: "Cultivo viva mujer",
        img: "https://www.senado.gov.co/images/mujer_rural.jpg",
        like: 1.213
      },
      {
        project_name: "Mujer primavera",
        img: "https://img.lalr.co/cms/2019/10/02112823/agricultoras.png",
        like: 1.113
      },
      {
        project_name: "Un mundo hecho campo",
        img: "https://www.vanguardia.com/binrepository/716x511/0c17/716d477/none/12204/OVCT/whatsapp-image-2022-10-20-at-3-25-43-pm_7589248_20221024120759.jpg",
        like: 1.205
      }
    ]
    
    setInterval(() => this.automaticCounter(), 4000 );
  }

  automaticCounter(){
    if(this.index==this.array_carousel.length-1){
      this.index=0;
    }else{
      this.index++;
    }
    this.operation= this.index*-(100/this.array_carousel.length);
  }

}
