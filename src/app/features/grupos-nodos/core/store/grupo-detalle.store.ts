import { inject, Injectable, signal } from '@angular/core';
import { GrupoDetalleService } from '../services/grupo-detalle.service';
import { Detalle } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class GrupoDetalleStore {
  private grupoService = inject(GrupoDetalleService);

  grupoDetalle = signal<Detalle[]>([]);
  loading = signal<boolean>(false);

  loadGrupoDetalle() {
    this.loading.set(true);
    this.grupoService.getGrupoDetalle().subscribe({
      next: (grupos) => {
        this.grupoDetalle.set(grupos);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  addGrupoDetalle(detalle: Detalle) {
    this.grupoService.addGrupoDetalle(detalle).subscribe((nuevo) => {
      this.grupoDetalle.update((grupos) => [...grupos, nuevo]);
    });
  }

  updateGrupoDetalle(detalle: Detalle) {
    this.grupoService.updateGrupoDetalle(detalle).subscribe((actualizado) => {
      this.grupoDetalle.update((grupos) =>
        grupos.map((g) => (g.id === actualizado.id ? actualizado : g))
      );
    });
  }
}
