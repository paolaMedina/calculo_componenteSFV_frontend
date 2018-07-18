import { v4 as uuid } from 'uuid';
import { Mttp } from './mttp.model';
import { Source } from './source.model';
export class FvField {

    nombre: string;
    private _id: string;
    fabricante_1: string;
    model_panel_solar_1: string;
    fabricante_2: string;
    modelo_panel_solar_2: string;
    mttps: Mttp[];
    /* Salida del inversor */
    salida_inversor: {input: Source, output: Source};
    constructor() {
        this._id = uuid();
        this.nombre = "";
        this.fabricante_1 = "";
        this.model_panel_solar_1 = "";
        this.modelo_panel_solar_2 = "";
        this.fabricante_2 = "";
        this.mttps  = new Array<Mttp>();
        this.salida_inversor = {input: new Source(), output: new Source()};
    }
    get id() {
        return this._id;
    }

}