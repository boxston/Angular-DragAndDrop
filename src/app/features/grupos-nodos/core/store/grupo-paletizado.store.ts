import { inject, Injectable, signal } from '@angular/core';
import { GrupoPaletizadoService } from '../services/grupo-paletizado.service';
import { Paletizado } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class GrupoPaletizadoStore {
  private grupoService = inject(GrupoPaletizadoService);

  grupoPaletizado = signal<Paletizado[]>([]);
  loading = signal<boolean>(false);

  loadGrupoPaletizado() {
    this.loading.set(true);
    this.grupoService.getGrupoPaletizado().subscribe({
      next: (grupos) => {
        this.grupoPaletizado.set(grupos);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  addGrupoPaletizado(paletizado: Paletizado) {
    this.grupoService.addGrupoPaletizado(paletizado).subscribe((nuevo) => {
      const yaExiste = this.grupoPaletizado().some(d => d.id === nuevo.id);
      if (yaExiste) return;
      this.grupoPaletizado.update((grupos) => [...grupos, nuevo]);
    });
    this.forceUpdateGrupoPaletizado();
  }

  updateGrupoPaletizado(paletizado: Paletizado) {
    this.grupoService.updateGrupoPaletizado(paletizado).subscribe((actualizado) => {
      this.grupoPaletizado.update((grupos) =>
        grupos.map((g) => (g.id === actualizado.id ? actualizado : g))
      );
    });
  }

  forceUpdateGrupoPaletizado() {
    this.grupoPaletizado.update(val => [...val]);
  }

}
