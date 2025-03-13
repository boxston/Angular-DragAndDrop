import { Injectable, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { Grupo } from "../interfaces/grupo.interface";

const list: Grupo[] = [
    { 
        id: 1,
        name: 'Grupo A',
        content: [
            {id: 1, name: "cd1", address:"falsa 1"},
            {id: 2, name: "cd2", address:"falsa 2"},
            {id: 3, name: "cd3", address:"falsa 3"},
            {id: 4, name: "cd4", address:"falsa 4"}
        ] 
    },
    { 
        id: 2,
        name: 'Grupo B',
        content: [
            {id: 5, name: "cd5", address:"falsa 5"},
            {id: 6, name: "cd6", address:"falsa 6"},
            {id: 7, name: "cd7", address:"falsa 7"},
            {id: 8, name: "cd8", address:"falsa 8"}
        ] 
    },
    { 
        id: 3,
        name: 'Grupo C',
        content: [
            {id: 9, name: "cd9", address:"falsa 9"},
            {id: 10, name: "cd10", address:"falsa 10"},
            {id: 11, name: "cd11", address:"falsa 11"},
            {id: 12, name: "cd12", address:"falsa 12"}
        ] 
    }
]

@Injectable({providedIn: 'root'})
export class GruposNodosService {
    gruposList = signal<Grupo[]>([]);

    getGrupos(): Observable<Grupo[]>{
        return of(list);
    }

    grupoList(): Observable<Grupo[]>{
        return of(list);
    }
    
    // Método para actualizar los datos cuando se mueve un elemento
    updateGrupos(updatedGrupos: Grupo[]) {
        this.gruposList.set([...updatedGrupos]); // Se clona para que el signal detecte el cambio
    }
}