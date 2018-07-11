import { Source } from "./source.model";
import { v4 as uuid } from 'uuid';

export class Mttp {
    id: string;
    /** name, can be number `1...n` or if Mttp is combined id can be `1-2` or `3-4` or `n-n+1`  */
    name: string;
    
    /** Número de paneles en serie por cadena */
    number_of_panels_in_series_per_chain: number;
    /** Número de cadenas en paralelo */
    number_of_chains_in_parallel: number;
    is_combined: boolean;
    /** Cableado */
    cabling: {input: Source, output: Source};
    constructor(name: string) {
        this.id = uuid();
        this.name = name;
        this.number_of_chains_in_parallel = -1;
        this.number_of_panels_in_series_per_chain = -1;
        this.is_combined = false;
        this.cabling = {input: new Source(), output: new Source()
        };
    }
    static getCombinedName(id_first_mttp: string | number, id_second_mttp: string | number): string {
        return `${id_first_mttp}-${id_second_mttp}`;
    }

}