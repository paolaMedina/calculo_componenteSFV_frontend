import { ValidacionConMensajeInterface } from "@app/core/lib/mttp-validations";

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
}