import { Component, computed, inject, OnInit } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatList, MatListItem } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NodoStore } from "../../core/store/nodo.store";
import { GrupoDetalleStore } from "../../core/store";

@Component({
    standalone: true,
    selector: 'grupo-nodo',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatList,
        MatListItem,
        
    ],
    templateUrl: './grupo-nodo.component.html',
    styleUrls: ['./grupo-nodo.component.scss'],
    providers: []
})
export class GrupoNodoPage implements OnInit {
    nodoStore = inject(NodoStore);
    grupoDetalleStore = inject(GrupoDetalleStore);
    
    constructor() {}
    
    ngOnInit(): void {
        this.nodoStore.loadNodo();
        this.grupoDetalleStore.loadGrupoDetalle();
    }

    getNodo() {
        return computed(() => {
          const nodos = this.nodoStore.nodo();
          const nodosDisponibles = this.grupoDetalleStore.grupoDetalle().map(g => g.nodoDestino);      
          return nodos.filter(n => !nodosDisponibles.includes(n.IdNodoItem));
        });
      }
}