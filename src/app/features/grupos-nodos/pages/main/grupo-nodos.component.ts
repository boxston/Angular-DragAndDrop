import { Component, inject } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GrupoCabeceraStore, GrupoDetalleStore, GrupoPaletizadoStore } from "../../core/store";
import { GrupoPaletizadoPage } from "../../components/grupo-paletizado/grupo-paletizado.components";
import { GrupoNodoPage } from "../../components/grupo-nodo/grupo-nodo.components";

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
}