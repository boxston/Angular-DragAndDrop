import { Component, computed, effect, inject, signal } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GrupoCabeceraStore, GrupoDetalleStore, GrupoPaletizadoStore } from "../../core/store";
import { GrupoPaletizadoPage } from "../../components/grupo-paletizado/grupo-paletizado.components";
import { GrupoNodoPage } from "../../components/grupo-nodo/grupo-nodo.components";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    standalone: true,
    selector: 'grupo-nodos-main',
    imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    GrupoPaletizadoPage,
    GrupoNodoPage
],
    templateUrl: './grupo-nodos.component.html',
    styleUrls: ['./grupo-nodos.component.scss'],
    providers: []
})
export class GrupoNodosPage {
    grupoPaletizadoStore = inject(GrupoPaletizadoStore);
    grupoCabeceraStore= inject(GrupoCabeceraStore);
    grupoDetalleStore = inject(GrupoDetalleStore);
    private _snackBar = inject(MatSnackBar);
    
    dropListGroupIds: string[] = [];
    searchQuery: string = ""; 

    loadingPaletizado = this.grupoPaletizadoStore.loading;   
    loadingCabecera = this.grupoCabeceraStore.loading;
    loadingDetalle = this.grupoDetalleStore.loading;   

    loadingGeneral = computed(() =>
        this.loadingPaletizado() || this.loadingCabecera() || this.loadingDetalle()
    );

    readonly watchLoading = effect(() => {
        if (this.loadingGeneral()) {
            this._snackBar.open('Sincronizando...', 'Cerrar');
        } else {
            this._snackBar.dismiss();
        }
    });

    ngOnInit() {
        this.grupoPaletizadoStore.loadGrupoPaletizado();
        this.grupoCabeceraStore.loadGrupoCabecera();
        this.grupoDetalleStore.loadGrupoDetalle();
    }

    drop(event: CdkDragDrop<any[]>) {
        const { container, previousContainer, item } = event;
        if (previousContainer.id === container.id) return;
        
        if (previousContainer.id === 'nodos-disponibles') {                     
            const grupoCabeceraDestinoId = parseInt(container.id.replace('cabecera-', ''));
            const {id, ...nodo} = item.data;
            this.grupoDetalleStore.addGrupoDetalle({
              ...nodo,
              grupoCabeceraId: grupoCabeceraDestinoId
            });
            return;
        }

        if (container.id === 'nodos-disponibles'){            
            this.grupoDetalleStore.deleteGrupoDetalle(item.data.id);
        };
        
        const isCabecera = (id: string) => id.startsWith('cabecera-');
        if(isCabecera(previousContainer.id) && isCabecera(container.id)) {            
            const grupoCabeceraDestinoId = parseInt(container.id.replace('cabecera-', '')); 
            const {usuario, ...nodo} = item.data;     
            this.grupoDetalleStore.updateGrupoDetalle({
                ...nodo,
                activo: true,
                grupoCabeceraId: grupoCabeceraDestinoId
            });
        }
    }
}