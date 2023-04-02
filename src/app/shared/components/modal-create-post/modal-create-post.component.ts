import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';



@Component({
  selector: 'app-modal-create-post',
  templateUrl: './modal-create-post.component.html',
  styleUrls: ['./modal-create-post.component.scss']
})
export class ModalCreatePostComponent implements OnInit {
  
  input_state: any;
  public project_list: any;
  public labels: Array<any>;
  public color_label;
  public var_close;
  public previous_closed;

  // Modal Variables
  showModal = false;
  currentModal = 'main'
  previusModal = 'main'

  // Select variables
  select_data = [
    {label: "Seleccionar", value: null},
    {label: "Un proyecto existente", value: "existente"},
    {label: "Un proyecto nuevo", value: "nuevo"},
  ]


  @Output() infoChange = new EventEmitter<any>();

  info = {
    name: "",
    publication_type: "",
    description: "",
    img: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
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

  constructor() { }

  ngOnInit(): void {
    this.input_state = true;
    this.project_list = [
      {
        img: "https://www.eldiario.com.co/wp-content/uploads/2021/09/NOTA-DOS.jpg",
        name: "Productos Alimenticios Campo Verde."
      },
      {
        img: "https://s3.amazonaws.com/elcomun/imagenes/1593722953.png",
        name: "Evento She is Music Pill."
      },
      {
        img: "https://s3.amazonaws.com/elcomun/imagenes/1590263173.png",
        name: "Granja Aromas de mi Tierra."
      },
      {
        img: "https://www.portafolio.co/files/article_main/uploads/2021/11/19/6197b801111db.jpeg",
        name: "Frutas y Derivados Villa Alegre."
      },
      {
        img: "https://imagenes.elpais.com/resizer/EElghNo5Ic_ifFfB0XW3w2jus6s=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/UDX5MHSQ65AT7PSKT2IFIX44TM.jpg",
        name: "Artesanias “Manos magicas”."
      },
      {
        img: "https://www.codespa.org/app/uploads/turismo-recortada.jpg",
        name: "Sombreros precolombinos -  May"
      },
    ]
  }


  btn_submit() {
    this.infoChange.emit({...this.info});
  }


  modal_control(name, type) {

    this.currentModal = name
    this.info.publication_type = type;
    this.showModal = true
    this.var_close = true;
    
  }


  changeModal(option) {
    this.previusModal = this.currentModal
    this.currentModal = option;
    
    this.previous_closed = this.var_close;
    this.var_close = true;

    this.previous_closed = this.var_close;
    this.var_close = true;
  }


  onInputFocus() {
    this.input_state = false;
  }


  onInputBlur() {
    console.log('Input blurred!');
    this.input_state = true;
  }


  selected_project(project) {
    this.info.linked = project.name;
  }


  returnPreviousModal(warning?) {

    this.currentModal = this.previusModal
    this.var_close = this.previous_closed;
  }


  //Zona horaria
  getZones(): any[] {
    const zones = moment.tz.names();
    return zones.map(zone => {
      const offset = moment.tz(zone).utcOffset();
      const sign = offset < 0 ? '-' : '+';
      const hours = Math.floor(Math.abs(offset) / 60);
      const minutes = Math.abs(offset) % 60;
      const formattedOffset = `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      return { name: zone, offset: formattedOffset };
    });
  }

  
  funtion_close() {
    this.var_close = false;
  }

  closeModal() {
    this.showModal = false
  }
}
