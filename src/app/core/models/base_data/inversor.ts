
export abstract class InversorAbstract {
     descripcion: string;
     modelo: string;
     fabricante: string;
     no_mppt: number;
     pot_nom: number;
     pot_fv_in_min: number;
     pot_fv_in_max: number;
     imax_in_mppt1: number;
     imax_in_mppt2: number;
     imax_in_mppt3: number;
     iscmax_mppt1: number;
     iscmax_mppt2: number;
     iscmax_mppt3: number;
     imax_in_mppt4: number;
     imax_in_mppt5: number;
     imax_in_mppt6 : number;
     imax_in_mppt1_2: number;
     imax_in_mppt3_4: number;
     imax_in_mppt5_6: number;
     iscmax_mppt4: number;
     iscmax_mppt5: number;
     iscmax_mppt6: number;
     iscmax_mppt1_2: number;
     iscmax_mppt3_4: number;
     iscmax_mppt5_6: number;
     vin_min: number;
     vin_max: number;
     vop_min: number;
     vop_max: number;
     vsal_1: number;
     vsal_2: number;
     vsal_3: number;
     tipo_conex: string;
     psal_1: number;
     psal_2: number;
     pot_sal_3: number;
     isal_max_1: number;
     isal_max_2: number;
     isal_max_3: number;
     i_int_sal_1: number;
     i_int_sal_2: number;
     i_int_sal_3: number;

}
export const inversorDefault0: InversorInterface = {
        descripcion : '',
    modelo : '',
    fabricante : '',
    no_mppt : 0,
    pot_nom : 0,
    pot_fv_in_min : 0,
    pot_fv_in_max : 0,
    imax_in_mppt1 : 0,
    imax_in_mppt2 : 0,
    imax_in_mppt3 : 0,
    iscmax_mppt1 : 0,
    iscmax_mppt2 : 0,
    iscmax_mppt3 : 0,
    imax_in_mppt4 : 0,
    imax_in_mppt5 : 0,
    imax_in_mppt6 : 0,
    imax_in_mppt1_2 : 0,
    imax_in_mppt3_4 : 0,
    imax_in_mppt5_6 : 0,
    iscmax_mppt4 : 0,
    iscmax_mppt5 : 0,
    iscmax_mppt6 : 0,
    iscmax_mppt1_2 : 0,
    iscmax_mppt3_4 : 0,
    iscmax_mppt5_6 : 0,
    vin_min : 0,
    vin_max : 0,
    vop_min : 0,
    vop_max : 0,
    vsal_1 : 0,
    vsal_2 : 0,
    vsal_3 : 0,
    tipo_conex : '',
    psal_1 : 0,
    psal_2 : 0,
    pot_sal_3 : 0,
    isal_max_1 : 0,
    isal_max_2 : 0,
    isal_max_3 : 0,
    i_int_sal_1 : 0,
    i_int_sal_2 : 0,
    i_int_sal_3 : 0
        };
export interface InversorInterface extends InversorAbstract {}
export class Inversor extends InversorAbstract {}

export class InversorFactory {
    public inversorDefault0: InversorInterface ; 

    constructor() {
        this.inversorDefault0 = inversorDefault0
    }
makeMultiple(inversorInterfaces: InversorInterface[]): Inversor[] {
    return inversorInterfaces.map(this.make);
}
make(inversorInterface: InversorInterface): Inversor {
        let inversor: Inversor = new Inversor(); 
        inversorInterface.descripcion? inversor.descripcion = inversorInterface.descripcion : inversor.descripcion = this.inversorDefault0.descripcion;
    inversorInterface.modelo? inversor.modelo = inversorInterface.modelo : inversor.modelo = this.inversorDefault0.modelo;
    inversorInterface.fabricante? inversor.fabricante = inversorInterface.fabricante : inversor.fabricante = this.inversorDefault0.fabricante;
    inversorInterface.no_mppt? inversor.no_mppt = Number(inversorInterface.no_mppt ): inversor.no_mppt = this.inversorDefault0.no_mppt;
    inversorInterface.pot_nom? inversor.pot_nom = Number(inversorInterface.pot_nom ): inversor.pot_nom = this.inversorDefault0.pot_nom;
   // inversorInterface.pot_fv_in_min? inversor.pot_fv_in_min = inversorInterface.pot_fv_in_min : inversor.pot_fv_in_min = this.inversorDefault0.pot_fv_in_min;
    inversorInterface.pot_fv_in_max? inversor.pot_fv_in_max = Number(inversorInterface.pot_fv_in_max ): inversor.pot_fv_in_max = this.inversorDefault0.pot_fv_in_max;
    inversorInterface.imax_in_mppt1? inversor.imax_in_mppt1 = Number(inversorInterface.imax_in_mppt1) : inversor.imax_in_mppt1 = this.inversorDefault0.imax_in_mppt1;
    inversorInterface.imax_in_mppt2? inversor.imax_in_mppt2 =Number( inversorInterface.imax_in_mppt2) : inversor.imax_in_mppt2 = this.inversorDefault0.imax_in_mppt2;
    inversorInterface.imax_in_mppt3? inversor.imax_in_mppt3 = Number(inversorInterface.imax_in_mppt3) : inversor.imax_in_mppt3 = this.inversorDefault0.imax_in_mppt3;
    inversorInterface.iscmax_mppt1? inversor.iscmax_mppt1 = Number(inversorInterface.iscmax_mppt1) : inversor.iscmax_mppt1 = this.inversorDefault0.iscmax_mppt1;
    inversorInterface.iscmax_mppt2? inversor.iscmax_mppt2 = Number(inversorInterface.iscmax_mppt2) : inversor.iscmax_mppt2 = this.inversorDefault0.iscmax_mppt2;
    inversorInterface.iscmax_mppt3? inversor.iscmax_mppt3 =Number( inversorInterface.iscmax_mppt3) : inversor.iscmax_mppt3 = this.inversorDefault0.iscmax_mppt3;
    inversorInterface.imax_in_mppt4? inversor.imax_in_mppt4 = Number(inversorInterface.imax_in_mppt4) : inversor.imax_in_mppt4 = this.inversorDefault0.imax_in_mppt4;
    inversorInterface.imax_in_mppt5? inversor.imax_in_mppt5 = Number(inversorInterface.imax_in_mppt5) : inversor.imax_in_mppt5 = this.inversorDefault0.imax_in_mppt5;
    inversorInterface.imax_in_mppt6? inversor.imax_in_mppt6 =Number( inversorInterface.imax_in_mppt6) : inversor.imax_in_mppt6 = this.inversorDefault0.imax_in_mppt6;
    inversorInterface.imax_in_mppt1_2? inversor.imax_in_mppt1_2 = Number(inversorInterface.imax_in_mppt1_2) : inversor.imax_in_mppt1_2 = this.inversorDefault0.imax_in_mppt1_2;
    inversorInterface.imax_in_mppt3_4? inversor.imax_in_mppt3_4 = Number(inversorInterface.imax_in_mppt3_4) : inversor.imax_in_mppt3_4 = this.inversorDefault0.imax_in_mppt3_4;
    inversorInterface.imax_in_mppt5_6? inversor.imax_in_mppt5_6 = Number(inversorInterface.imax_in_mppt5_6) : inversor.imax_in_mppt5_6 = this.inversorDefault0.imax_in_mppt5_6;
    inversorInterface.iscmax_mppt4? inversor.iscmax_mppt4 = Number(inversorInterface.iscmax_mppt4) : inversor.iscmax_mppt4 = this.inversorDefault0.iscmax_mppt4;
    inversorInterface.iscmax_mppt5? inversor.iscmax_mppt5 = Number(inversorInterface.iscmax_mppt5) : inversor.iscmax_mppt5 = this.inversorDefault0.iscmax_mppt5;
    inversorInterface.iscmax_mppt6? inversor.iscmax_mppt6 = Number(inversorInterface.iscmax_mppt6) : inversor.iscmax_mppt6 = this.inversorDefault0.iscmax_mppt6;
    inversorInterface.iscmax_mppt1_2? inversor.iscmax_mppt1_2 = Number(inversorInterface.iscmax_mppt1_2) : inversor.iscmax_mppt1_2 = this.inversorDefault0.iscmax_mppt1_2;
    inversorInterface.iscmax_mppt3_4? inversor.iscmax_mppt3_4 = Number(inversorInterface.iscmax_mppt3_4) : inversor.iscmax_mppt3_4 = this.inversorDefault0.iscmax_mppt3_4;
    inversorInterface.iscmax_mppt5_6? inversor.iscmax_mppt5_6 = Number(inversorInterface.iscmax_mppt5_6) : inversor.iscmax_mppt5_6 = this.inversorDefault0.iscmax_mppt5_6;
    inversorInterface.vin_min? inversor.vin_min = Number(inversorInterface.vin_min) : inversor.vin_min = this.inversorDefault0.vin_min;
    inversorInterface.vin_max? inversor.vin_max =Number( inversorInterface.vin_max) : inversor.vin_max = this.inversorDefault0.vin_max;
    inversorInterface.vop_min? inversor.vop_min = Number(inversorInterface.vop_min) : inversor.vop_min = this.inversorDefault0.vop_min;
    inversorInterface.vop_max? inversor.vop_max = Number(inversorInterface.vop_max) : inversor.vop_max = this.inversorDefault0.vop_max;
    inversorInterface.vsal_1? inversor.vsal_1 = Number(inversorInterface.vsal_1 ): inversor.vsal_1 = this.inversorDefault0.vsal_1;
    inversorInterface.vsal_2? inversor.vsal_2 = Number(inversorInterface.vsal_2) : inversor.vsal_2 = this.inversorDefault0.vsal_2;
    inversorInterface.vsal_3? inversor.vsal_3 = Number(inversorInterface.vsal_3 ): inversor.vsal_3 = this.inversorDefault0.vsal_3;
    inversorInterface.tipo_conex? inversor.tipo_conex = inversorInterface.tipo_conex: inversor.tipo_conex = this.inversorDefault0.tipo_conex;
    inversorInterface.psal_1? inversor.psal_1 = Number(inversorInterface.psal_1) : inversor.psal_1 = this.inversorDefault0.psal_1;
    inversorInterface.psal_2? inversor.psal_2 =Number( inversorInterface.psal_2) : inversor.psal_2 = this.inversorDefault0.psal_2;
    inversorInterface.pot_sal_3? inversor.pot_sal_3 = Number(inversorInterface.pot_sal_3) : inversor.pot_sal_3 = this.inversorDefault0.pot_sal_3;
    inversorInterface.isal_max_1? inversor.isal_max_1 =Number( inversorInterface.isal_max_1 ): inversor.isal_max_1 = this.inversorDefault0.isal_max_1;
    inversorInterface.isal_max_2? inversor.isal_max_2 = Number(inversorInterface.isal_max_2) : inversor.isal_max_2 = this.inversorDefault0.isal_max_2;
    inversorInterface.isal_max_3? inversor.isal_max_3 = Number(inversorInterface.isal_max_3) : inversor.isal_max_3 = this.inversorDefault0.isal_max_3;
    inversorInterface.i_int_sal_1? inversor.i_int_sal_1 = Number(inversorInterface.i_int_sal_1) : inversor.i_int_sal_1 = this.inversorDefault0.i_int_sal_1;
    inversorInterface.i_int_sal_2? inversor.i_int_sal_2 = Number(inversorInterface.i_int_sal_2) : inversor.i_int_sal_2 = this.inversorDefault0.i_int_sal_2;
    inversorInterface.i_int_sal_3? inversor.i_int_sal_3 = Number(inversorInterface.i_int_sal_3) : inversor.i_int_sal_3 = this.inversorDefault0.i_int_sal_3 
        return inversor;}

    }