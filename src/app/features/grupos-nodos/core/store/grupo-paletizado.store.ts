import { inject, Injectable, signal } from '@angular/core';
import { GrupoPaletizadoService } from '../services/grupo-paletizado.service';
import { Paletizado } from '../interfaces';
import { ResponseDTO } from '../interfaces/responseDTO.interface';

@Injectable({ providedIn: 'root' })
export class GrupoPaletizadoStore {
  private grupoService = inject(GrupoPaletizadoService);

  grupoPaletizado = signal<Paletizado[]>([]);
  loading = signal<boolean>(false);

  loadGrupoPaletizado() {
    this.loading.set(true);
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

  forceUpdateGrupoPaletizado() {
    this.grupoPaletizado.update(val => [...val]);
  }

}
