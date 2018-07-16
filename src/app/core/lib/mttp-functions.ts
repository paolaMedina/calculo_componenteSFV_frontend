import { Mttp } from "../models";

export function potencia_nominal(total_paneles: number, potencia_nominal: number): number {
    return total_paneles * potencia_nominal;
}

export function tension_Mpp_MPPTn( no_paneles_en_serie_por_cadena: number , vmpp_panel: number ): number {
    return no_paneles_en_serie_por_cadena  * vmpp_panel;
}
export function corriente_Mpp_MPPTn (no_de_cadenas_en_paralelo: number, impp_panel: number): number {
    return no_de_cadenas_en_paralelo * impp_panel;
}

export function tension_maxima_MPPTn(
    no_paneles_en_serie_por_cadena: number,
    voc_panel: number,
    coefc_Voc: number, temp_ambiente_mas_baja_esperada: number
): number {
    return no_paneles_en_serie_por_cadena * voc_panel * coefc_Voc * (temp_ambiente_mas_baja_esperada - 25  );
}
export function corriente_maxima_MPPTn(no_cadenas_paralelo: number, isc_panel: number ) : number{
    return no_cadenas_paralelo * isc_panel * 1.25;
}
export function total_de_paneles(no_paneles_en_serie_por_cadena: number, no_cadenas_en_paralelo: number): number {
    return no_cadenas_en_paralelo * no_paneles_en_serie_por_cadena;
}
export function potencia_fv_total(panelesMttp: Mttp[], pnom_panel: number): number {
    let _total_de_paneles = 0;
    for (let panelMttp of panelesMttp ){
        _total_de_paneles = _total_de_paneles + total_de_paneles(panelMttp.numero_de_cadenas_en_paralelo, panelMttp.numero_de_paneles_en_serie_por_cadena);
    }
        return  _total_de_paneles * pnom_panel;
}