import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Sfv } from '../../core/models';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SfvService {
  sfv: Sfv;
  constructor(private apiService: ApiService, public snackBar: MatSnackBar) {
    this.sfv = new Sfv();

   }

  get(): Sfv {
    return this.sfv;
  }
  set(sfv: Sfv) {
    this.sfv = sfv;
  }
  private postvalidate(sfvErrors: Sfv) {
    
    if(sfvErrors.combinacion_inversor) {
      this.snackBar.open('Debe ingresar información de combinación de inversor', 'Aceptar', {
        duration: 6000,
      });
      return;
    }
    if ( sfvErrors.fvs ) {
      for ( let i = 0; i < sfvErrors.fvs.length; i++ ) {
        let errores: string[] = Object.keys(sfvErrors.fvs[i]);
        if( errores.length > 0 ) {
          
          let cantidad_errores = errores.length;
          this.snackBar.open(`Se han encontrado errores en los campos ${errores.splice(0,3).join(', ')} ${cantidad_errores>3?  ' y '  + (cantidad_errores - 3) + ' más': ''} en el campo FV ${i+1}`, 'Aceptar', {
            duration: 6000,
          });
          return;
        }
      }
    }
  }
  send(sfv: Sfv) {
    console.log(sfv, 'sfv enviado')
    this.apiService.post('postData', sfv).subscribe(
      response=> {
        console.log(response)
        this.apiService.postRedirect('postData', sfv);
      },
      (response: any) => {
        let sfvErrors: Sfv = response.error;

        console.log(response.error, 'errores desde catch errors')
        this.postvalidate(sfvErrors);
      }
    );
  }

}
