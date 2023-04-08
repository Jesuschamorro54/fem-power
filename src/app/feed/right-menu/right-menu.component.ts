import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {
  public array_recommendations: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.array_recommendations=[
      {name: "Liliana Martinez",
       img: "https://img.lalr.co/cms/2021/04/20143147/Mujeres-rurales.jpg"
      },
      {name: "Tati Sanchez",
       img: "https://files.rcnradio.com/2019-10/banana-4493420_1920.jpg"
      },
      {name: "Lucia Landines",
       img: "https://oi-files-d8-prod.s3.eu-west-2.amazonaws.com/s3fs-public/foto-mexico-2.jpg"
      },
      {name: "Tuti Hernandez",
       img: "https://www.undp.org/sites/g/files/zskgke326/files/migration/cr/undp_cr_politica_genero_MAG_02_20.jpg"
      }
    ];
  }

}
