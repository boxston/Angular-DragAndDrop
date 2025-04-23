export interface Detalle {
    id?: number;
    grupoCabeceraId?: number;
    nodoDestino: number;
    nodoCodigo: number;
    nodoDescripcion?: string;
    nodoTipo?: number;
    usuario?: string;
}