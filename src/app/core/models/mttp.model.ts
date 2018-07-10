export class Mttp {
    /** Id, can be number `1...n` or if Mttp is combined id can be `1-2` or `3-4` or `n-n+1`  */
    id: string;
    /** Número de paneles en serie por cadena */
    number_of_panels_in_series_per_chain: number;
    /** Número de cadenas en paralelo */
    number_of_chains_in_parallel: number;
    /** Cableado */
    cabling: any;
    constructor(id: string) {
        this.id = id;
        this.number_of_chains_in_parallel = -1;
        this.number_of_panels_in_series_per_chain = -1;
    }
    static getCombinedName(id_first_mttp: string | number, id_second_mttp: string | number): string {
        return `${id_first_mttp}-${id_second_mttp}`;
    }

}