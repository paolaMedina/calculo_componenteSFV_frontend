import { v4 as uuid } from 'uuid';
import { Mttp } from './mttp.model';
import { Source } from './source.model';
export class FvField {

    name: string;
    private _id: string;
    manufacturer_1: string;
    solar_panel_model_1: string;
    manufacturer_2: string;
    solar_panel_model_2: string;
    mttps: Mttp[];
    /* Salida del inversor */
    investor_output: {input: Source, output: Source};
    constructor() {
        this._id = uuid();
        this.name = "";
        this.manufacturer_1 = "";
        this.solar_panel_model_1 = "";
        this.solar_panel_model_2 = "";
        this.manufacturer_2 = "";
        this.mttps  = new Array<Mttp>();
        this.investor_output = {input: new Source(), output: new Source()};
    }
    get id() {
        return this._id;
    }

}