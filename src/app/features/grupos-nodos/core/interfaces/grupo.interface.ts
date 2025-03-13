import { Nodo } from "./nodo.interface";

export interface Grupo {
    id: number;
    name: string;
    content: Nodo[];
}