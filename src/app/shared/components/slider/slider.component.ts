import { Component, Input, OnInit } from '@angular/core';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() slider_type: string;

  @Input() slider_invert: Boolean;

  public array_slider: Array<any>;
  public array_highlights_projects: Array<any>;

  public index: number;
  public color: string;
  public position_ul: any;
  public operation: any;


  constructor() { 
    this.color="white";
    this.index=0;
    this.position_ul = document.querySelector("#position-ul");
    this.operation= 0;

    this.array_slider=[
      {title: "Como mujer rural",
       description: "Puedes ser parte de RuralWom seleccionando la opción Únete e indicando el codigo que le asigne su fundación. ",
       requirements: "Requisitos: Pertener a una fundación que se encuentre registrada en RuralWom.",
       img: "https://fomenta.org.co/wp-content/uploads/2022/10/ima1-blog.jpg"
      },
      {title: "Como fundación",
       description: "Puedes ser parte de RuralWom seleccionando la opción Únete y adjuntando el documento que certifica a la entidad como organizacion sin animo de lucro para mujeres rurales. ",
       requirements: "Requisitos: Tener registrada a la entidad nacionalmente y tener el certificado.",
       img: "https://www.clarin.com/img/2020/03/10/fLGL7dv2_1200x630__1.jpg"
      },
      {title: "Como empresa",
       description: "Puedes ser parte de RuralWom seleccionando la opción Únete y adjuntando el documento que certifica a la entidad como organizacion legalmente constituida. ",
       requirements: "Requisitos: Tener registrada a la entidad, y estar dispuesta a contribuir economicamente con el progreso de las mujeres rurales en sus determinadas fundaciones.",
       img: "https://www.aaa.com.co/wp-content/uploads/2017/12/Premio-Triple-A1-2017.jpg"
      }
    ];

    this.array_highlights_projects=[
      {name: "Desarrollo de cultivo de platano",
       authors: "Juana Valentina, Laura Nathaly",
       fundation: "Mujer y Futuro",
       img: "https://storage.contextoganadero.com/s3fs-public/ganaderia/field_image/2019-05/mujeres_rurales.jpg"
      },
      {name: "La tierra de cultivos",
       authors: "Sandra Milena",
       fundation: "Mujeres guerreras",
       img: "http://elcampesino.co/wp-content/uploads/2017/03/Captura-de-pantalla-2015-10-29-a-las-3.17.42-p.m..jpg"
      }
    ];
  }

  ngOnInit(): void {
    if(this.slider_type=="automatic"){
      setInterval(() => this.automaticCounter(), 4000 );
    }
  };

  next(): void{
    if(this.index==this.array_slider.length-1){
      this.index=0;
    }else{
      this.index++;
    }
    this.operation= this.index*-(100/this.array_slider.length);
  }

  previous(){
    if(this.index==0){
      this.index=this.array_slider.length-1;
    }else{
      this.index--;
    }
    this.operation= this.index*-(100/this.array_slider.length);

  }

  automaticCounter(){
    if(this.index==this.array_slider.length-1){
      this.index=0;
    }else{
      this.index++;
    }
    this.operation= this.index*-(100/this.array_slider.length);

  }
}
