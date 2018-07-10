import { v4 as uuid } from 'uuid';
import { Mttp } from './mttp.model';
export class FvField {

    name: string;
    id: string;
    manufacturer_1: string;
    solar_panel_model_1: string;
    manufacturer_2: string;
    solar_panel_model_2: string;
    mttps: Mttp[];
    constructor() {
        this.id = uuid();
        this.name = "";
        this.manufacturer_1 = "";
        this.solar_panel_model_1 = "";
        this.solar_panel_model_2 = "";
        this.manufacturer_2 = "";
        this.mttps  = null;
    }

}