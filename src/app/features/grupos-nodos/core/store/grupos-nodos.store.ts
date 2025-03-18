import { 
    patchState,
    signalStore,
    withMethods,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Grupo } from "../interfaces/grupo.interface";
import { Nodo } from "../interfaces/nodo.interface"
import { pipe, switchMap } from 'rxjs';
import { GruposNodosService } from '../services/grupos-nodos.service';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';

type GruposNodosState = {
    nodos: Nodo[];
    grupos: Grupo[];
    query: string;
}

const initialState: GruposNodosState = {
    nodos: [],
    grupos: [],
    query: ''
}

export const GruposNodosStore = signalStore(
    withState(initialState),
    withMethods((store, gruposNodosService = inject(GruposNodosService)) => ({
        loadGrupos: rxMethod<void>(
            pipe(
                switchMap(()=> gruposNodosService.getGrupos().pipe(
                    tapResponse({
                        next: (grupos) => {
                            patchState(store, {grupos})
                        },
                        error: () => {}
                    })
                ))
            )
        ),
        loadNodos: rxMethod<void>(
            pipe(
                switchMap(()=> gruposNodosService.getNodos().pipe(
                    tapResponse({
                        next: (nodos) => {
                            patchState(store, {nodos})
                        },
                        error: () => {}
                    })
                ))
            )
        ),
        changeNodoGroup: (grupos: Grupo[]) => {
            patchState(store, {grupos})
        } 
    }))
);