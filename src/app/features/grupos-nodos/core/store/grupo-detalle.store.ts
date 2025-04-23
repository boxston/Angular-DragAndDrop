import { inject, Injectable, signal } from '@angular/core';
import { GrupoDetalleService } from '../services/grupo-detalle.service';
import { Detalle } from '../interfaces';
import { ResponseDTO } from '../interfaces/responseDTO.interface';
import { formatDateForBackend } from '../helpers/formatDateForBackend.helper';

@Injectable({ providedIn: 'root' })
export class GrupoDetalleStore {
  private grupoService = inject(GrupoDetalleService);

  grupoDetalle = signal<Detalle[]>([]);
  loading = signal<boolean>(false);

  clearGrupoDetalle() {
    this.grupoDetalle.set([]);
  }

  loadGrupoDetalle() {
    this.loading.set(true);
    this.clearGrupoDetalle();
    this.grupoService.getGrupoDetalle()
      .subscribe((response: ResponseDTO<Detalle[]>) =>{        
        if (response.hasError || !Array.isArray(response.data)) {
          this.grupoDetalle.set([]);
          this.loading.set(false);
          return;
        }
        this.grupoDetalle.set(response.data);        
        this.loading.set(false);
      });
  }

  addGrupoDetalle(detalle: Detalle) {
    this.loading.set(true);
    this.grupoService.addGrupoDetalle(detalle)
      .subscribe((response: ResponseDTO<Detalle>) => {
        if (response.hasError) {
          this.loading.set(false);
          return;
        }
        this.grupoDetalle.update((grupos) => [...grupos, response.data]);
        this.loading.set(false);
      });
    this.forceUpdateGrupoDetalle();
  }

  updateGrupoDetalle(detalle: Detalle) {
    this.loading.set(true);
    this.grupoService.updateGrupoDetalle(detalle)
      .subscribe((response: ResponseDTO<Detalle>) => {
        if (response.hasError) {
          this.loading.set(false);
          return;
        }
        this.grupoDetalle.update((grupos) =>
          grupos.map((g) => (g.id === response.data.id ? response.data : g))
        );
        this.loading.set(false);
        this.forceUpdateGrupoDetalle();
      });
  }

  forceUpdateGrupoDetalle() {
    this.grupoDetalle.update(val => [...val]);
  }

  deleteGrupoDetalle(nodoDestino: number) {
    this.loading.set(true);
    this.grupoService.deleteGrupoDetalle(nodoDestino).subscribe(() => {
      this.grupoDetalle.update((grupos) => grupos.filter(g => g.id !== nodoDestino));
      this.loading.set(false);
      this.forceUpdateGrupoDetalle();
    });
  }
}
