import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  public array_publications: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.array_publications=[
      {
        publication_type:"projects",
        description: "La integración de los servicios de apoyo que el proyecto ofrece a los beneficiarios con el fin de incrementar la producción, productividad y mejorar los ingresos de la población",
        cover: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
        linked: "Granja Aromas de mi Tierra",
        publication_time:"",
        event_type: "",
        address: "",
        date: "",
        time_zone:"",
        start_date:"",
        ending_date:"",
        start_time: "",
        ending_time: "",

      },
      {
        publication_type:"photos_videos",
        description: "",
        cover: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
        linked: "",
        publication_time:"",
        event_type: "",
        address: "",
        date: "",
        time_zone:"",
        start_date:"",
        ending_date:"",
        start_time: "",
        ending_time: "",
      },
      {
        publication_type:"photos_videos",
        description: "La integración de los servicios de apoyo que el proyecto ofrece a los beneficiarios con el fin de incrementar la producción, productividad y mejorar los ingresos de la población",
        cover: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
        linked: "Granja Aromas de mi Tierra",
        publication_time:"",
        event_type: "",
        address: "",
        date: "",
        time_zone:"",
        start_date:"",
        ending_date:"",
        start_time: "",
        ending_time: ""
      },
      {
        publication_type:"events",
        title: "Integración mujeres del Magdalena",
        description: "Integración de Mujeres rurales del departamento del Magndalena con el obtivo de motivarlas a progresar en el campo.",
        cover: "https://s3.amazonaws.com/elcomun/imagenes/1589843442.jpg",
        event_type: "online",
        address: "https://www.linkedin.com/feed/",
        start_time: "15:00",
        ending_time: "16:30",
        publication_time:"",
        time_zone:"",
        start_date:"25-06-2023",
        ending_date:"23-06-2023",
      },
    ]
  }

  add_publication(info: any) {
    console.log('Información recibida:', info);
    this.array_publications.unshift(info)
    console.log(this.array_publications);
  }

  suma = 0
  addkk(){

    console.log("añadiendo publicacion")

    let info = {
      name: "",
      publication_type: "photos_videos",
      description: "hola 123" + this.suma++,
      cover: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
      linked: "",
      publication_time: "",
      event_type: "",
      address: "",
      date: "",
      time_zone: "",
      start_date: "",
      ending_date: "",
      start_time: "",
      ending_time: ""
    };

    this.array_publications.unshift(info)

    console.log(this.array_publications)
  }
  
}
