export class Sfv {
    power_of_plant_fv: number;
    total_panels_fv: number;
    total_fields_fv: number;
    power_of_panel_fv: number;
    ambient_temperature: number;
    lowest_ambient_temperature_expected: number;
    investment_type: string;
    service_type: string;
    service_voltage: number;
    instalation_place: string;

    constructor() {
        this.total_fields_fv = 1;
    }
}