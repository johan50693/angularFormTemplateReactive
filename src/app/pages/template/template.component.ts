import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario={
    nombre: 'Albert',
    apellido: 'Urbina',
    email: 'albert@yopmail.com',
    pais: 'VEN',
    genero: 'M'
  };

  paises: any[]=[];

  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe(paises => {
      // console.log(paises);
      this.paises=paises;
      this.paises.unshift({
        nombre: 'Seleccione',
        codigo: ''
      });
    });
  }

  guardar(formulario: NgForm){
    console.log("Se envía el formulario");
    if(formulario.invalid){
      Object.values(formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return ;
    }
    console.log(formulario);
  }

}
