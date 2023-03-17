import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-static-women',
  templateUrl: './form-static-women.component.html',
  styleUrls: ['./form-static-women.component.scss']
})
export class FormStaticWomenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  solicitud = {
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    zonaRural: '',
    fundacion: ''
  };

  async onSubmit() {
    console.log('Solicitud enviada');
  }

}
