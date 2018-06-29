import { v4 as uuid } from 'uuid';
export class FvField {

   name: string;
    id: string;
    manufacturer: string;
    solar_panel_model: string;
    MPPTs_config: any;
    cabling_details: any;
    constructor() {
        this.id = uuid();
    }

}