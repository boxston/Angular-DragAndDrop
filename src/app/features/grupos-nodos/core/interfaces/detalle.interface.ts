export interface Detalle {
    id?: number;
    grupoCabeceraId?: number;
    nodoDestino: number;
    activo: boolean;
    nodoCodigo: number;
    nodoDescripcion?: string;
    nodoTipo?: number;
    usuario?: string;
}