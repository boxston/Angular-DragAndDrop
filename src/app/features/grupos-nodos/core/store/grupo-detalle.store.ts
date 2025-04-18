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
      const yaExiste = this.grupoDetalle().some(d => d.nodoDestino === detalle.nodoDestino);
      if (yaExiste) return;  
      this.grupoDetalle.update((grupos) => [...grupos, nuevo]);
    });
    this.forceUpdateGrupoDetalle();
  }

  updateGrupoDetalle(detalle: Detalle) {
    this.grupoService.updateGrupoDetalle(detalle).subscribe((actualizado) => {
      this.grupoDetalle.update((grupos) =>
        grupos.map((g) => (g.id === actualizado.id ? actualizado : g))
      );
      this.forceUpdateGrupoDetalle();
    });
  }

  forceUpdateGrupoDetalle() {
    this.grupoDetalle.update(val => [...val]);
  }

  deleteGrupoDetalle(nodoDestino: number) {
    this.grupoService.deleteGrupoDetalle(nodoDestino).subscribe(() => {
      this.grupoDetalle.update((grupos) => grupos.filter(g => g.nodoDestino !== nodoDestino));
      this.forceUpdateGrupoDetalle();
    });
  }
}
