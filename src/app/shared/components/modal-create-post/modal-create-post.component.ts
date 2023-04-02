import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';



@Component({
  selector: 'app-modal-create-post',
  templateUrl: './modal-create-post.component.html',
  styleUrls: ['./modal-create-post.component.scss']
})
export class ModalCreatePostComponent implements OnInit {
  public modal_name: any;
  public selected: any;
  input_state: any;
  public project_list: any;
  public labels: Array<any>;
  public color_label;
  public var_close;
  public previous_closed;

  @Output() infoChange = new EventEmitter<any>();
  info ={
    name:"",
    publication_type:"",
        description: "",
        img: "https://www.minagricultura.gov.co/noticias/PublishingImages/Paginas/Forms/AllItems/mujer%20rural%201.jpg",
        linked: "",
        publication_time:"",
        event_type: "",
        address: "",
        date: "",
        time_zone:"",
        start_date:"",
        ending_date:"",
        start_time: "",
        ending_time: ""
  };

  constructor() { }

  ngOnInit(): void {
    this.input_state=true;
    this.modal_name= {"projects": false, "photos_videos": false, "events": false};
    this.project_list=[
      {
        img: "https://www.eldiario.com.co/wp-content/uploads/2021/09/NOTA-DOS.jpg",
        name:"Productos Alimenticios Campo Verde."
      },
      {
        img: "https://s3.amazonaws.com/elcomun/imagenes/1593722953.png",
        name:"Evento She is Music Pill."
      },
      {
        img: "https://s3.amazonaws.com/elcomun/imagenes/1590263173.png",
        name:"Granja Aromas de mi Tierra."
      },
      {
        img: "https://www.portafolio.co/files/article_main/uploads/2021/11/19/6197b801111db.jpeg",
        name:"Frutas y Derivados Villa Alegre."
      },
      {
        img: "https://imagenes.elpais.com/resizer/EElghNo5Ic_ifFfB0XW3w2jus6s=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/UDX5MHSQ65AT7PSKT2IFIX44TM.jpg",
        name:"Artesanias “Manos magicas”."
      },
      {
        img: "https://www.codespa.org/app/uploads/turismo-recortada.jpg",
        name:"Sombreros precolombinos -  May"
      }, 
    ]
  }

  btn_submit(){
    this.infoChange.emit(this.info);
  }


  modal_control(name){
    if(name=="projects"){
      this.modal_name.projects= true;
    }
    else if(name=="photos_videos"){
      this.modal_name.photos_videos= true;
    }
    else if(name=="events"){
      this.modal_name.events= true;
    }else{
      this.modal_name.projects= false;
      this.modal_name.photos_videos= false;
      this.modal_name.events= false;
      this.selected=null;
    }
    this.info.publication_type=name;
    this.var_close=true;
  }
  onChange(option: any) {
    if(typeof(option)=="string"){
      this.selected=option;
    }else{
      this.selected= option.value;
    }
    this.previous_closed=this.var_close;
    this.var_close=true;
  }
  onInputFocus() {
    this.input_state=false;
  }
  onInputBlur() {
    console.log('Input blurred!');
    this.input_state=true;
  }
  selected_project(project){
    this.info.linked=project.name;
  }
  continue_or_not(warning){
    if(warning==true){
      if(this.info.linked!=""){
        this.selected= null;
      }
    }else{
      this.selected= null;
      this.info.linked= "";
    }
    this.var_close=this.previous_closed;
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
      return {name: zone, offset: formattedOffset};
    });
  }
  funtion_close(){
    this.var_close=false;
  }
}
