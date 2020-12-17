import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) { 
    this.crearformulario();
    this.cargarDataForm();
    this.cargarListeners();
  }

  ngOnInit() {
  }

  get pasatiempos(){
    return this.formulario.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }
  
  get correoNoValido(){
    return this.formulario.get('correo').invalid && this.formulario.get('correo').touched;
  }
  
  get usuarioNoValido(){
    return this.formulario.get('usuario').invalid && this.formulario.get('usuario').touched;
  }
  
  get distritoNoValido(){
    return this.formulario.get('direccion.distrito').invalid && this.formulario.get('direccion.distrito').touched;
  }
  
  get ciudadNoValido(){
    return this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched;
  }

  get pass1NoValido(){
    return this.formulario.get('pass1').invalid && this.formulario.get('pass1').touched;
  }
  
  get pass2NoValido(){
    const pass1= this.formulario.get('pass1').value;
    const pass2= this.formulario.get('pass2').value;
    return  (pass1 === pass2) ? false:true;
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control('',Validators.required));
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  crearformulario(){

    this.formulario= this.fb.group({
      nombre: ['',[Validators.required, Validators.minLength(5)]],
      apellido: ['',[Validators.required, Validators.minLength(5), this.validadores.noApellido]],
      correo: ['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      usuario: ['', ,this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['',Validators.required],
        ciudad: ['',Validators.required],
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  cargarListeners(){
    // this.formulario.valueChanges.subscribe( valor =>{
    //   console.log(valor);
    // });

    // this.formulario.statusChanges.subscribe(status => {console.log(status)});
    this.formulario.get('nombre').valueChanges.subscribe(nombre =>{ console.log(nombre)});
  }

  cargarDataForm(){
    this.formulario.reset({
      nombre: 'Albert',
      apellido: 'Urbina',
      correo: 'albert@yopmail.com',
      pass1: '12345',
      pass2: '12345',
      direccion: {
        distrito: 'Metropolitano',
        ciudad: 'Caracas'
      }
    });
  }

  guardar(){
    console.log("Se envía el formulario");
    console.log(this.formulario);
    if(this.formulario.invalid){
      Object.values(this.formulario.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(cont =>{
            cont.markAsTouched();
          })
        }else{
          control.markAsTouched();
        }
      });
      return ;
    }
    this.formulario.reset();
  }


}
