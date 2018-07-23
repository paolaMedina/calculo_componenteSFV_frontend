import { Inversor, Mttp } from "@app/core/models";
import { ResultadoValidacion } from "@app/core/enums";
export interface ValidacionConMensajeInterface {
    resultadoValidacion: ResultadoValidacion;
    mensajeError: String;
}
function fromWToKW(pontenciaEnKw: number) {
    return pontenciaEnKw * Math.pow(10, 3);
}
export function validar_potencia_nominal(inversor: Inversor, potencia_nominal: number): ValidacionConMensajeInterface {
    if (potencia_nominal < fromWToKW(inversor.pot_fv_in_max)) {
        return { resultadoValidacion: ResultadoValidacion.CORRECTO, mensajeError: '' };
    } else {
        return {
            resultadoValidacion: ResultadoValidacion.ERROR,
            mensajeError: "La potencia de este solo MPPT supera la Pot FV recomendada del Inv (Considerando sobredimensionamiento)"
        };
    }
}

export function validar_tension_mppt(inversor: Inversor, tension_mppt: number): ValidacionConMensajeInterface {
    
    let resultado: ValidacionConMensajeInterface;
    console.log(tension_mppt < inversor.vin_min, 'validacion tension mppt')
    /** Si esta dentro de el rango vop  */
    if (tension_mppt > inversor.vop_min && tension_mppt < inversor.vop_max) {
        console.log(inversor, tension_mppt, 'inversor y tension en validar tension')
        resultado = {
            resultadoValidacion: ResultadoValidacion.CORRECTO,
            mensajeError: "La tension se encuentra dentro de los valores de operacion recomendados del Inv"

        };
    } 
    /** Si no esta dentro de el rango  vop  y se sale de el rango vin */
    else if (tension_mppt > inversor.vin_max) {
        resultado = {
            resultadoValidacion: ResultadoValidacion.ERROR,
            mensajeError: "La tension del Mppt supera la tension maxima del Inv"

        };
    } else if (tension_mppt < inversor.vin_min) {
        resultado = {
            resultadoValidacion: ResultadoValidacion.ERROR,
            mensajeError: "La tension del Mppt se encuentra por debajo de la tension de inicio del Inv"
        }
    } 
    /* Si no esta en el rango vop, y no se sale del rango vin */
    else if (tension_mppt > inversor.vop_max) {
        resultado = {
            resultadoValidacion: ResultadoValidacion.ADVERTENCIA,
            mensajeError: "La tensión se encuentra dentro de los limites operativos; pero por encima de los valores recomendados"

        };
    } else if (tension_mppt < inversor.vop_min) {
        resultado = {
            resultadoValidacion: ResultadoValidacion.ADVERTENCIA,
            mensajeError: "La tensión se encuentra dentro de los limites operativos; pero por debajo de los valores recomendados"
        };
    }




    return resultado;

}

function exist_attribute_in_object(attribute_name: string, object: any) {
    let nombre_atributos = Object.keys(object);
    if ( ! nombre_atributos.includes(attribute_name) ) {
        console.error(`El atributo de nombre ${attribute_name} no esta en el objeto ingresado, atributos: ${nombre_atributos.join(',')}`)
    }
}

export function validar_corriente_mppt(inversor: Inversor, corriente_mppt: number, mttp: Mttp): ValidacionConMensajeInterface {
    let mppt_name_normalized = mttp.nombre;
    mppt_name_normalized = mppt_name_normalized.replace('-', '_');
    let imax_in_mppt__mttp_name = 'imax_in_mppt' + mppt_name_normalized;

    if ( corriente_mppt < inversor[imax_in_mppt__mttp_name] ) {
        return { resultadoValidacion: ResultadoValidacion.CORRECTO, mensajeError: '' };
    } else {
        return {
            resultadoValidacion: ResultadoValidacion.ADVERTENCIA,
            mensajeError: "La corriente nominal del mppt supera el Maximo recomendado del Inv"
        };
    }
}

export function validar_corriente_maxima(inversor: Inversor, corriente_maxima: number, mttp: Mttp): ValidacionConMensajeInterface {

    let mppt_name_normalized = mttp.nombre;
    mppt_name_normalized = mppt_name_normalized.replace('-', '_');
    let iscmax__mttp_name = 'iscmax_mppt' + mppt_name_normalized;
    console.log(corriente_maxima, inversor[iscmax__mttp_name], 'corriente maxima y iscmax')
    if ( corriente_maxima < inversor[iscmax__mttp_name] ) {
        return { resultadoValidacion: ResultadoValidacion.CORRECTO, mensajeError: '' };
    } else {
        return {
            resultadoValidacion: ResultadoValidacion.ADVERTENCIA,
            mensajeError: "La Isc no supera el Máximo Inv"
        };
    }

}

export function validar_tension_maxima(inversor: Inversor, tension_maxima: number): ValidacionConMensajeInterface {
    if ( tension_maxima <= inversor.vin_max ) {
        return { resultadoValidacion: ResultadoValidacion.CORRECTO, mensajeError: '' };
    } else {
        return {
            resultadoValidacion: ResultadoValidacion.ADVERTENCIA,
            mensajeError: "La tensión se encuentra fuera de los valores Máximo y mínimo del In"
        };
    }
}

export function validar_potencia_fv(inversor: Inversor, potencia_fv: number): ValidacionConMensajeInterface {
    console.log(inversor.pot_fv_in_max, 'inversor pot fv in max')
    if ( potencia_fv < fromWToKW(inversor.pot_fv_in_max )) {
        return { resultadoValidacion: ResultadoValidacion.CORRECTO, mensajeError: '' };
    } else {
        return {
            resultadoValidacion: ResultadoValidacion.ERROR,
            mensajeError: "La tensión se encuentra fuera de los valores Máximo y mínimo del In"
        };
    }
}