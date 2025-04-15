import { inject, Injectable, signal } from '@angular/core';
import { Nodo } from '../interfaces';
import { NodoService } from '../services/nodo.service';

@Injectable({ providedIn: 'root' })
export class NodoStore {
  private nodoService = inject(NodoService);

  nodo = signal<Nodo[]>([]);
  loading = signal<boolean>(false);

  loadNodo() {
    this.loading.set(true);
    this.nodoService.getNodo().subscribe({
      next: (nodos) => {
        this.nodo.set(nodos);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
