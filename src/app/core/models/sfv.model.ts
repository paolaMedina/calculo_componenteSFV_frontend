import { InvestorTypeEnum } from "@app/core/enums";

export class Sfv {
    power_of_plant_fv: number;
    total_panels_fv: number;
    power_of_panel_fv: number;
    ambient_temperature: number;
    lowest_ambient_temperature_expected: number;
    investor_type: InvestorTypeEnum;
    number_of_fields_fv: number;
    service_type: string;
    service_voltage: number;
    instalation_place: string;
}