import { v4 as uuid } from 'uuid';
export class FvField {

    name: string;
    id: string;
    manufacturer_1: string;
    solar_panel_model_1: string;
    manufacturer_2: string;
    solar_panel_model_2: string;
    MPPTs_config: any;
    cabling_details: any;
    constructor() {
        this.id = uuid();
    }

}