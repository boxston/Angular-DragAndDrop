export interface Cabecera {
    id: number;
    grupoPaletizadoId: number;
    nodoDestinatarioId: number;
    nodoPlazaRuteoId: number;
    activo: boolean;
    usuario?: string;
}