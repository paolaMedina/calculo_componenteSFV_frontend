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
    if ( sfvErrors.fvs ) {
      for ( let i = 0; i < sfvErrors.fvs.length; i++ ) {
        let errores: string[] = Object.keys(sfvErrors.fvs[i]);
        if( errores.length > 0 ) {
          
          let cantidad_errores = errores.length;
          this.snackBar.open(`Se han encontrado errores en los campos ${errores.splice(0,3).join(', ')} ${cantidad_errores>3?  ' y '  + (cantidad_errores - 3) + ' más': ''} en el campo FV ${i+1}`, 'Aceptar', {
            duration: 6000,
            verticalPosition: 'top'
          });
          return;
        }
      }
    }
  }
  send(sfv: Sfv) {
    //sfv =  JSON.parse('{"combinacion_inversor":{"input":{"_id":"3d82dfab-771c-4701-8daa-973cd7232d77","tipo_alambrado":"Al aire libre","tipo_canalizacion":null,"maximo_numero_de_conductores":0,"material_bandeja":null,"tamanio_canalizacion":null,"tipo_acabado":null,"caida_de_tension_de_diseno":1,"tipo_conductor":"THHN/THWN-2 CT","material_conductor":"Cobre","distancia_del_conductor_mas_largo":1,"disenio_bandeja":null,"tapa_superior_bandeja_portacable":null,"tapa_inferior_bandeja_portacable":null,"perfiles_separadores":null,"longitud_tramo":null,"ancho_mm":null,"alto_mm":null,"tipo_carga":null}},"potencia_de_planta_fv":4,"nombre_proyecto":"3","temperatura_ambiente":4,"lugar_instalacion":"Suelo","calcular_potencial_de_planta":null,"tipo_de_inversor":"Inversores de cadena","minima_temperatura_ambiente_esperada":4,"potencial_de_panel_fv":null,"total_paneles_fv":null,"tipo_servicio":"Trifásica","voltage_servicio":"440","lugar_instalacion_opcion_techo_cubierta":"Caso A","fvs":[{"_id":"617502a3-bc5d-4c6d-9811-e838cd3ea9b7","nombre":"Campo FV 3","fabricante_1":"JA Solar","model_panel_solar_1":"JA Solar 325W 72 Cel Policristalina","modelo_panel_solar_2":"Inversor Fronius Symo 22,7kW 480V  3~","fabricante_2":"Fronius","mttps":[{"_id":"f5fc8031-2e33-48b7-99f3-c7f382ca48c4","nombre":"1","numero_de_cadenas_en_paralelo":1,"numero_de_paneles_en_serie_por_cadena":12,"es_combinado":false,"cableado":{"input":{"_id":"3f978cab-172f-470e-8fcc-276ec7877573","tipo_alambrado":"Al aire libre","tipo_canalizacion":null,"maximo_numero_de_conductores":1,"material_bandeja":null,"tamanio_canalizacion":null,"tipo_acabado":null,"caida_de_tension_de_diseno":1,"tipo_conductor":"Fotovoltaico","material_conductor":"Cobre","distancia_del_conductor_mas_largo":1,"disenio_bandeja":null,"tapa_superior_bandeja_portacable":null,"tapa_inferior_bandeja_portacable":null,"perfiles_separadores":null,"longitud_tramo":null,"ancho_mm":null,"alto_mm":null,"tipo_carga":null},"output":{"_id":"f8145b20-616e-4127-9196-61f35090581e","tipo_alambrado":"Al aire libre","tipo_canalizacion":null,"maximo_numero_de_conductores":1,"material_bandeja":null,"tamanio_canalizacion":null,"tipo_acabado":null,"caida_de_tension_de_diseno":1,"tipo_conductor":"Fotovoltaico","material_conductor":"Cobre","distancia_del_conductor_mas_largo":1,"disenio_bandeja":null,"tapa_superior_bandeja_portacable":null,"tapa_inferior_bandeja_portacable":null,"perfiles_separadores":null,"longitud_tramo":null,"ancho_mm":null,"alto_mm":null,"tipo_carga":null}}},{"_id":"5e1f0d25-4d7c-4d1d-97a2-b87bc0cc7b57","nombre":"2","numero_de_cadenas_en_paralelo":1,"numero_de_paneles_en_serie_por_cadena":12,"es_combinado":false,"cableado":{"input":{"_id":"39a2f79b-3a74-4de7-98e9-4b9212b37704","tipo_alambrado":"Al aire libre","tipo_canalizacion":null,"maximo_numero_de_conductores":1,"material_bandeja":null,"tamanio_canalizacion":null,"tipo_acabado":null,"caida_de_tension_de_diseno":1,"tipo_conductor":"THHN/THWN-2 CT","material_conductor":"Aluminio","distancia_del_conductor_mas_largo":1,"disenio_bandeja":null,"tapa_superior_bandeja_portacable":null,"tapa_inferior_bandeja_portacable":null,"perfiles_separadores":null,"longitud_tramo":null,"ancho_mm":null,"alto_mm":null,"tipo_carga":null},"output":{"_id":"3624d4fd-04b8-4814-9873-72cdccd4796b","tipo_alambrado":"Al aire libre","tipo_canalizacion":null,"maximo_numero_de_conductores":1,"material_bandeja":null,"tamanio_canalizacion":null,"tipo_acabado":null,"caida_de_tension_de_diseno":1,"tipo_conductor":"THHN/THWN-2 CT","material_conductor":"Cobre","distancia_del_conductor_mas_largo":1,"disenio_bandeja":null,"tapa_superior_bandeja_portacable":null,"tapa_inferior_bandeja_portacable":null,"perfiles_separadores":null,"longitud_tramo":null,"ancho_mm":null,"alto_mm":null,"tipo_carga":null}}}],"salida_inversor":{"output":{"_id":"5495effd-1189-4590-8ac0-5b31fb6b2eba","tipo_alambrado":"Al aire libre","tipo_canalizacion":null,"maximo_numero_de_conductores":1,"material_bandeja":null,"tamanio_canalizacion":null,"tipo_acabado":null,"caida_de_tension_de_diseno":1,"tipo_conductor":"THHN/THWN-2 CT","material_conductor":"Cobre","distancia_del_conductor_mas_largo":1,"disenio_bandeja":null,"tapa_superior_bandeja_portacable":null,"tapa_inferior_bandeja_portacable":null,"perfiles_separadores":null,"longitud_tramo":null,"ancho_mm":null,"alto_mm":null,"tipo_carga":null}}}]}');
    this.apiService.post('postData2', sfv)
    .subscribe(
      response=> {
        this.apiService.postRedirect(sfv.nombre_proyecto, sfv);
      },
      (response: any) => {
        let sfvErrors: Sfv = response.error;

        console.log(response, 'errores desde catch errors')
        this.postvalidate(sfvErrors);
      }
    );
  }

}
