import { Routes } from "@angular/router";
import { MainPage } from "./pages/main-page/main-page.component";

export const GRUPOS_NODOS_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: MainPage,
                title: 'Grupos de Nodos'
            }
        ]
    },
];