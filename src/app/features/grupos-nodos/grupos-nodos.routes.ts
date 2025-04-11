import { Routes } from "@angular/router";
import { GrupoNodosPage } from "./pages/main/grupo-nodos.component";

export const GRUPOS_NODOS_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: GrupoNodosPage,
                title: 'Grupos de Nodos'
            }
        ]
    },
];