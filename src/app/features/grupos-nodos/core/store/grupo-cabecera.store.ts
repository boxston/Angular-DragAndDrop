import { inject, Injectable, signal } from '@angular/core';
import { GrupoCabeceraService } from '../services/grupo-cabecera.service';
import { Cabecera } from '../interfaces/index';
import { GrupoDetalleStore } from './grupo-detalle.store';

@Injectable({ providedIn: 'root' })
export class GrupoCabeceraStore {
  private grupoService = inject(GrupoCabeceraService);
  private grupoDetalleStore = inject(GrupoDetalleStore);

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
      const yaExiste = this.grupoCabecera().some(d => d.id === nuevo.id);
      if (yaExiste) return;
      this.grupoCabecera.update((grupos) => [...grupos, nuevo]);
    });
    this.forceUpdateGrupoCabecera();
  }

  updateGrupoCabecera(cabecera: Cabecera) {
    this.grupoService.updateGrupoCabecera(cabecera).subscribe((actualizado) => {
      this.grupoCabecera.update((grupos) =>
        grupos.map((g) => (g.id === actualizado.id ? actualizado : g))
      );
    });
  }  

  deleteGrupoCabecera(cabeceraId: number) {
    this.grupoService.deleteGrupoCabecera(cabeceraId).subscribe(() => {
      this.grupoCabecera.update((grupos) =>
        grupos.filter((g) => g.id !== cabeceraId)
      );
      this.grupoDetalleStore.loadGrupoDetalle();  
    });
  }

  forceUpdateGrupoCabecera() {
    this.grupoCabecera.update(val => [...val]);
  }
}
