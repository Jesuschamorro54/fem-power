import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  public array_publications: any;

  constructor() { }

  ngOnInit(): void {
    this.array_publications=[
      {
        publication_type:"projects",
        description: "La integración de los servicios de apoyo que el proyecto ofrece a los beneficiarios con el fin de incrementar la producción, productividad y mejorar los ingresos de la población",
        img: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
        linked: "Granja Aromas de mi Tierra",
        time:"1 día",
        amount_likes: 123,
        amount_comments: 8,
        amount_shared: 2
      },
      {
        publication_type:"photos_videos",
        description: null,
        img: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
        linked: null,
        time:"1 día",
        amount_likes: 98,
        amount_comments: 1,
        amount_shared: 5
      },
      {
        publication_type:"photos_videos",
        description: "La integración de los servicios de apoyo que el proyecto ofrece a los beneficiarios con el fin de incrementar la producción, productividad y mejorar los ingresos de la población",
        img: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
        linked: "Granja Aromas de mi Tierra",
        time:"1 día",
        amount_likes: 98,
        amount_comments: 1,
        amount_shared: 5
      },
      {
        publication_type:"events",
        title: "Integración mujeres del Magdalena",
        description: "Integración de Mujeres rurales del departamento del Magndalena con el obtivo de motivarlas a progresar en el campo.",
        img: "https://s3.amazonaws.com/elcomun/imagenes/1589843442.jpg",
        event_type: "online",
        address: "https://www.linkedin.com/feed/",
        date: "05/11/22",
        start_time: "15:00",
        ending_time: "16:30",
        time:"1 día",
      },
    ]
  }

  
}
