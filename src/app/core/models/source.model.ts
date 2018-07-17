import { v4 as uuid } from 'uuid';

export class Source {
    id: string;
    tipo_alambrado: string;
    tipo_conductor: string;
    distancia_del_conductor_mas_largo: number;
    caida_de_tension_de_diseño: number;
    /** Canalización */
    tipo_canalizacion: string;
    canalizacion: string;
    tamanio_canalizacion: number;
    material_conductor: string;
    /** Bandeja portacable */
    disenio_bandeja: string;
    material_bandeja: string;
    tipo_acabado: string;

    tapa_superior_bandeja_portacable: boolean;
    tapa_inferior_bandeja_portacable: boolean;
    perfiles_separadores: boolean;
    longitud_tramo: boolean;
    ancho_mm: number;
    maximo_numero_de_conductores: number;
    alto_mm: number
    tipo_carga: string;
    constructor() {
        this.id = uuid();
    }
}