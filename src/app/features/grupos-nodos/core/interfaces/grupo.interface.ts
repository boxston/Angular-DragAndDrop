import { Cabecera } from "./cabecera.interface";
import { Detalle } from "./detalle.interface";
import { Paletizado } from "./paletizado.interface";

export interface Grupo {
    paletizado: Paletizado[];
    cabecera: Cabecera[];
    detalle: Detalle[];
}