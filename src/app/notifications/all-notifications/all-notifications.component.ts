import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss']
})
export class AllNotificationsComponent implements OnInit {
  public array_notifications: Array<any>;
  public show_delete_modal: boolean;
  public item_delete;
  public route: string;

  constructor() { }

  ngOnInit(): void {
    this.show_delete_modal= false;
    this.array_notifications= [
      {
        id: 1,
        img: "data:image/png;base64,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",
        name: "Fundación Santo Domindo",
        action: "seguir",
        associated_content: "",
        is_accepted: ""
      },
      {
        id: 2,
        img: "https://www.indap.gob.cl/sites/default/files/2022-02/mujeres-rurales-ays%C3%A9n-1.jpg",
        name: "Miranda Suarez",
        action: "integrar",
        associated_content: "",
        is_accepted: ""
      },
      {
        id: 3,
        img: "https://centromayor.com.co/sites/default/files/locales/local/images/2020-08-26/logo_bancolombia.jpg",
        name: "BanColombia",
        action: "patrocinar",
        associated_content: "Tierra con aroma de mujer",
        is_accepted: ""
      },
      {
        id: 4,
        img: "https://www.renatre.org.ar/wp-content/uploads/2019/11/REGIONAL_CONVENIO061017IMG_4752.jpg",
        name: "Tatiana Altazar",
        action: "colaborar_proyecto",
        associated_content: "Granja el colmenar",
        is_accepted: ""
      },
      {
        id: 5, 
        img: "https://lac.unwomen.org/sites/default/files/Headquarters/Images/Sections/News/In%20Focus/Rural%20women%20food%20and%20poverty%20eradication%20days/Guatemala_InFocus_RuralWomen2015_Banner_675x350.jpg?la=en&h=350&w=675",
        name: "Tamara Landinez",
        action: "invitar_evento",
        associated_content: "",
        is_accepted: ""
      },
      {
        id: 6,
        img: "https://www.bbva.com/wp-content/uploads/2022/10/Graciela-Vela%CC%81squez-Financiera-Confianza.jpg",
        name: "Mariela Karin",
        action: "gustar",
        associated_content: "",
        is_accepted: ""
      },
      {
        id: 7,
        img: "https://blog.globalcaja.es/wp-content/uploads/2020/10/Dia-Mujeres-rurales.jpg",
        name: "Dayana San Martin",
        action: "comentar",
        associated_content: "",
        is_accepted: ""
      },
    ];
  }
  showModal(index){
    this.show_delete_modal=true;
    this.item_delete = index;
  }
  closeModal(){
    this.item_delete = "";
    this.show_delete_modal = false;
  }
  deleteNotification(){
    console.log(this.item_delete);
    this.show_delete_modal= false;
    this.array_notifications.splice(this.item_delete, 1);
  }
  prueba(index, value){
    if (value){
      this.array_notifications[index].is_accepted=1;
    }else{
      this.array_notifications[index].is_accepted=-1;
    }
  }
}
