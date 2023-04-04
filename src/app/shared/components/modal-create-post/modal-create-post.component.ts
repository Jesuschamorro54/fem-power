import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal-create-post',
  templateUrl: './modal-create-post.component.html',
  styleUrls: ['./modal-create-post.component.scss']
})
export class ModalCreatePostComponent implements OnInit {
  public modal_name: any;
  public project_type : any;
  input_state: any;
  public project_list: any;
  public chosen_project: any;
  // public labels: Array<any>;
  // public color_label;


  constructor() { }

  ngOnInit(): void {
    this.input_state=true;
    this.modal_name= {"projects": false, "photos_videos": false, "events": false};
    this.chosen_project="Seleccionar"
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
      this.project_type=null;
    }

    // if (this.project_list){
    //   this.project_list=null;
    // }
  }
  onChange(option: any) {
    if(typeof(option)=="string"){
      this.project_type=option;
    }else{
      this.project_type= option.value;
    }
  }
  onInputFocus() {
    this.input_state=false;
  }
  onInputBlur() {
    console.log('Input blurred!');
    this.input_state=true;
  }
  selected_project(project){
    this.chosen_project=project.name;
  }
  // selected_label(person){
  //   if(this.labels.length==0){
  //     this.labels.push(person);
  //   }else{
  //     this.labels.forEach(label => {
  //       if(label==person){

  //       }else{
          
  //       }
  //     });
  //   }
  // }
  continue_or_not(warning){
    if(warning==true){
      if(this.chosen_project!="Seleccionar"){
        this.project_type= null;
      }

    }else{
      this.project_type= null;
      this.chosen_project= "Seleccionar";
    }
  }
}
