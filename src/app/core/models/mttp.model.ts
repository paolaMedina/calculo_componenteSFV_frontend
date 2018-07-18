import { Source } from "./source.model";
import { v4 as uuid } from 'uuid';

export class Mttp {
    id: string;
    /** nombre, can be number `1...n` or if Mttp is combined id can be `1-2` or `3-4` or `n-n+1`  */
    nombre: string;
    /** Número de paneles en serie por cadena */
    numero_de_paneles_en_serie_por_cadena: number;
    /** Número de cadenas en paralelo */
    numero_de_cadenas_en_paralelo: number;
    es_combinado: boolean;
    /** Cableado */
    cableado: {input: Source, output: Source};

    constructor(nombre: string) {
        this.id = uuid();
        this.nombre = nombre;
        this.numero_de_cadenas_en_paralelo = -1;
        this.numero_de_paneles_en_serie_por_cadena = -1;
        this.es_combinado = false;
        this.cableado = {input: new Source(), output: new Source()};
    }
    static getCombinedName(id_first_mttp: string | number, id_second_mttp: string | number): string {
        return `${id_first_mttp}-${id_second_mttp}`;
    }

}