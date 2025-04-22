import { inject, Injectable, Injector, signal } from '@angular/core';
import { GrupoPaletizadoService } from '../services/grupo-paletizado.service';
import { Paletizado } from '../interfaces';
import { ResponseDTO } from '../interfaces/responseDTO.interface';
import { GrupoCabeceraStore } from './grupo-cabecera.store';
import { GrupoDetalleStore } from './grupo-detalle.store';

@Injectable({ providedIn: 'root' })
export class GrupoPaletizadoStore {
  private grupoService = inject(GrupoPaletizadoService);
  private injector = inject(Injector);

  grupoPaletizado = signal<Paletizado[]>([]);
  loading = signal<boolean>(false);

  clearGrupoPaletizado() {
    this.grupoPaletizado.set([]);
  }

  loadGrupoPaletizado() {
    this.loading.set(true);
    this.clearGrupoPaletizado();
    this.grupoService.getGrupoPaletizado()
      .subscribe((response: ResponseDTO<Paletizado[]>) => {
        if (response.hasError || !Array.isArray(response.data)) {
          this.grupoPaletizado.set([]);
          this.loading.set(false);
          return;
        }        
        this.grupoPaletizado.set(response.data);
        this.loading.set(false);
      });
  }

  addGrupoPaletizado(paletizado: Paletizado) {
    this.loading.set(true);
    this.grupoService.addGrupoPaletizado(paletizado)
      .subscribe((response: ResponseDTO<Paletizado>) => {
        if (response.hasError) {
          this.loading.set(false);
          return;
        }
        this.grupoPaletizado.update((grupos) => [...grupos, response.data]);
        this.loading.set(false);
      });
    this.forceUpdateGrupoPaletizado();
  }

  updateGrupoPaletizado(paletizado: Paletizado) {
    this.loading.set(true);
    this.grupoService.updateGrupoPaletizado(paletizado)
      .subscribe((response: ResponseDTO<Paletizado>) => {
        if (response.hasError) {
          this.loading.set(false);
          return;
        }
        this.grupoPaletizado.update((grupos) =>
          grupos.map((g) => (g.id === response.data.id ? response.data : g))
        );
      });
  }

  deleteGrupoPaletizado(paletizadoId: number) {
    this.loading.set(true);
    this.grupoService.deleteGrupoPaletizado(paletizadoId)
      .subscribe(() => {
        this.loadGrupoPaletizado();
        
        const grupoCabeceraStore = this.injector.get(GrupoCabeceraStore);
        grupoCabeceraStore.loadGrupoCabecera();
        
        const grupoDetalleStore = this.injector.get(GrupoDetalleStore);
        grupoDetalleStore.loadGrupoDetalle();

        this.loading.set(false);
      });
  }

  forceUpdateGrupoPaletizado() {
    this.grupoPaletizado.update(val => [...val]);
  }

}