import { InvestorTypeEnum } from "../../core/enums";

export class Sfv {
    potencia_de_planta_fv: number;
    nombre_proyecto: string;
    total_paneles_fv?: number;
    calcular_potencial_de_planta: boolean;
    potencial_de_panel_fv: number;
    temperatura_ambiente: number;
    minima_temperatura_ambiente_esperada: number;
    tipo_de_inversor: InvestorTypeEnum;
    lugar_instalacion__opcion_techo_cubierta: string;
    tipo_servicio: string;
    voltage_servicio: number;
    lugar_instalacion: string;
}