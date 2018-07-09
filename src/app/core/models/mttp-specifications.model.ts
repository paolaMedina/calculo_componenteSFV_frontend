export class MttpSpecifications {
    potencia_nominal: number;
    tension_Mpp_MPPTn: number;
    corriente_Mpp_MPPTn: number;
    tension_maxima_MPPTn: number;
    total_de_paneles: number;
    potencia_fv_total: number;
    corriente_maxima_MPPTn: number;
    constructor(){
      this.potencia_nominal = 0;
      this.tension_Mpp_MPPTn = 0;
      this.corriente_Mpp_MPPTn= 0;
      this.tension_maxima_MPPTn=0;
      this.total_de_paneles = 0;
      this.potencia_fv_total = 0;
      this.corriente_maxima_MPPTn = 0;
    }
}