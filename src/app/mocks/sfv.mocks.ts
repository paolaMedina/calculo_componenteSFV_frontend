import { Sfv, FvField } from "../core/models";

export const sfv_mock: Sfv = JSON.parse('{"power_of_plant_fv":45,"ambient_temperature":4,"instalation_place":"Suelo","number_of_fields_fv":null,"investor_type":"Inversores de cadena","lowest_ambient_temperature_expected":4,"power_of_panel_fv":null,"service_type":"Trifásica","service_voltage":"220","total_panels_fv":null}');
export const fvField_mock : FvField = JSON.parse('{"id":"e5e09643-feb0-4b99-9f2e-59b3458542f7","name":"Campo FV 0","manufacturer_1":"JinkoSolar","solar_panel_model_1":"JinkoSolar 255W 60 Cel Policristalina","solar_panel_model_2":"INVERSOR PARA PROBAR APP (NO USAR)","manufacturer_2":"PRUEBA","mttps":null} ');
