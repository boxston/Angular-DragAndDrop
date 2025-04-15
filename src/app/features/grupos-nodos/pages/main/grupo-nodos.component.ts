import { Component, inject } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GrupoCabeceraStore, GrupoDetalleStore, GrupoPaletizadoStore } from "../../core/store";
import { GrupoPaletizadoPage } from "../../components/grupo-paletizado/grupo-paletizado.components";
import { GrupoNodoPage } from "../../components/grupo-nodo/grupo-nodo.components";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

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
    
    dropListGroupIds: string[] = [];
    searchQuery: string = ""; 

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
            this.grupoDetalleStore.addGrupoDetalle({
              ...item.data,
              grupoCabeceraId: grupoCabeceraDestinoId
            });
            return;
        }

        if (container.id === 'nodos-disponibles'){
            this.grupoDetalleStore.deleteGrupoDetalle(item.data.nodoDestino);
        };
        
        const isCabecera = (id: string) => id.startsWith('cabecera-');
        if(isCabecera(previousContainer.id) && isCabecera(container.id)) {            
            const grupoCabeceraDestinoId = parseInt(container.id.replace('cabecera-', ''));            
            this.grupoDetalleStore.updateGrupoDetalle({
              ...item.data,
              grupoCabeceraId: grupoCabeceraDestinoId
            });
        }
    }
}