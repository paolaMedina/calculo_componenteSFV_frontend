import { ValidacionConMensajeInterface } from "../../core/lib/mttp-validations";
import { ResultadoValidacion } from "../enums";

export class MttpSpecifications_Validation {
    potencia_nominal: ValidacionConMensajeInterface | undefined;
    tension_Mpp_MPPTn: ValidacionConMensajeInterface | undefined;
    corriente_Mpp_MPPTn: ValidacionConMensajeInterface | undefined;
    tension_maxima_MPPTn: ValidacionConMensajeInterface | undefined;
    total_de_paneles: ValidacionConMensajeInterface | undefined;
    potencia_fv_total: ValidacionConMensajeInterface | undefined;
    corriente_maxima_MPPTn: ValidacionConMensajeInterface | undefined;
    constructor(){
      this.potencia_nominal = undefined;
      this.tension_Mpp_MPPTn = undefined;
      this.corriente_Mpp_MPPTn= undefined;
      this.tension_maxima_MPPTn= undefined;
      this.total_de_paneles = undefined;
      this.potencia_fv_total = undefined;
      this.corriente_maxima_MPPTn = undefined;
    }
    valid(): boolean {
      if (
        (this.potencia_nominal.resultadoValidacion && this.potencia_nominal.resultadoValidacion !== ResultadoValidacion.ERROR) && 
        (this.corriente_maxima_MPPTn.resultadoValidacion && this.corriente_maxima_MPPTn.resultadoValidacion !== ResultadoValidacion.ERROR) && 
        (this.corriente_Mpp_MPPTn.resultadoValidacion && this.corriente_Mpp_MPPTn.resultadoValidacion !== ResultadoValidacion.ERROR) && 
        (this.potencia_fv_total.resultadoValidacion && this.potencia_fv_total.resultadoValidacion !== ResultadoValidacion.ERROR) && 
        (this.tension_maxima_MPPTn.resultadoValidacion && this.tension_maxima_MPPTn.resultadoValidacion !== ResultadoValidacion.ERROR) && 
        (this.tension_Mpp_MPPTn.resultadoValidacion && this.tension_Mpp_MPPTn.resultadoValidacion !== ResultadoValidacion.ERROR)
      ) {
        return true;
      } else {
        return false;
      }
    }
}