import { inject, Injectable, signal } from '@angular/core';
import { GrupoCabeceraService } from '../services/grupo-cabecera.service';
import { Cabecera } from '../interfaces/index';

@Injectable({ providedIn: 'root' })
export class GrupoCabeceraStore {
  private grupoService = inject(GrupoCabeceraService);

  grupoCabecera = signal<Cabecera[]>([]);
  loading = signal<boolean>(false);

  loadGrupoCabecera() {
    this.loading.set(true);
    this.grupoService.getGrupoCabecera().subscribe({
      next: (grupos) => {
        this.grupoCabecera.set(grupos);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  addGrupoCabecera(cabecera: Cabecera) {
    this.grupoService.addGrupoCabecera(cabecera).subscribe((nuevo) => {
      this.grupoCabecera.update((grupos) => [...grupos, nuevo]);
    });
  }

  updateGrupoCabecera(cabecera: Cabecera) {
    this.grupoService.updateGrupoCabecera(cabecera).subscribe((actualizado) => {
      this.grupoCabecera.update((grupos) =>
        grupos.map((g) => (g.id === actualizado.id ? actualizado : g))
      );
    });
  }
}
