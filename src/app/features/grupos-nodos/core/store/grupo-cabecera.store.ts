import { inject, Injectable, signal } from '@angular/core';
import { GrupoCabeceraService } from '../services/grupo-cabecera.service';
import { Cabecera } from '../interfaces/index';
import { ResponseDTO } from '../interfaces/responseDTO.interface';

@Injectable({ providedIn: 'root' })
export class GrupoCabeceraStore {
  private grupoService = inject(GrupoCabeceraService);

  grupoCabecera = signal<Cabecera[]>([]);
  loading = signal<boolean>(false);

  loadGrupoCabecera() {
    this.loading.set(true);
    this.grupoService.getGrupoCabecera()
      .subscribe((response: ResponseDTO<Cabecera[]>) => {
          if (response.hasError) {
            this.grupoCabecera.set([]);
            this.loading.set(false);
            return;
          }          
          this.grupoCabecera.set(response.data);
          this.loading.set(false);
        }
      );
  }

  addGrupoCabecera(cabecera: Cabecera) {
    this.loading.set(true);
    this.grupoService.addGrupoCabecera(cabecera)
      .subscribe((response: ResponseDTO<Cabecera>) => {
        if (response.hasError) {
          this.loading.set(false);
          return;
        }
        this.grupoCabecera.update((grupos) => [...grupos, response.data]);
        this.loading.set(false);
      });
    this.forceUpdateGrupoCabecera();
  }

  updateGrupoCabecera(cabecera: Cabecera) {
    this.loading.set(true);
    this.grupoService.updateGrupoCabecera(cabecera)
      .subscribe((response: ResponseDTO<Cabecera>) => {
        if (response.hasError) {
          this.loading.set(false);
          return;
        }
        this.grupoCabecera.update((grupos) => 
          grupos.map((g) => (g.id === response.data.id ? response.data : g))
        );
        this.loading.set(false);
      });
    this.forceUpdateGrupoCabecera();
  }  

  deleteGrupoCabecera(cabeceraId: number) {
    this.loading.set(true);
    this.grupoService.deleteGrupoCabecera(cabeceraId)
      .subscribe(() => {
        this.grupoCabecera.update((grupos) =>
          grupos.filter((g) => g.id !== cabeceraId)
        );
        this.loading.set(false);
      });
    this.forceUpdateGrupoCabecera();
  }

  forceUpdateGrupoCabecera() {
    this.grupoCabecera.update(val => [...val]);
  }
}
