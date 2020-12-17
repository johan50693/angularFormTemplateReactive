import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noApellido( control: FormControl): {[s:string]:boolean} {

    if( control.value.toLowerCase() === 'test'){
      return {
        noApellido:true
      }
    }

    return null;
  }

  passwordsIguales(pass1: string, pass2: string){
    return (formulario: FormGroup) =>{
        
        const pass1Validate= formulario.controls[pass1];
        const pass2Validate= formulario.controls[pass2];
        if (pass1Validate.value === pass2Validate.value) {
          pass2Validate.setErrors(null);
        }else{
          pass2Validate.setErrors({noEsIgual: true});
        }
    }
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve,reject) =>{
      
      setTimeout(() => {
        if (control.value === 'qwerty') {
          resolve({existe:true});
        }else{
          resolve(null);
        }
      }, 3500);

    });
  }

}
