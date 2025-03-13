import { Routes } from '@angular/router';
import { GRUPOS_NODOS_ROUTES } from './features/grupos-nodos/grupos-nodos.routes';

export const routes: Routes = [
    {
        path: '',
        children: GRUPOS_NODOS_ROUTES
    }
];
