import { InvestorTypeEnum } from "../../core/enums";

export class Sfv {
    power_of_plant_fv: number;
    total_panels_fv?: number;
    calculate_plant_potential: boolean;
    power_of_panel_fv: number;
    ambient_temperature: number;
    lowest_ambient_temperature_expected: number;
    investor_type: InvestorTypeEnum;
    number_of_fields_fv: number;
    instalation_place_ceiling_option?: string;
    service_type: string;
    service_voltage: number;
    instalation_place: string;
}