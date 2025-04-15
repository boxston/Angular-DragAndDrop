import { Component, computed, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatList, MatListItem } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NodoStore } from "../../core/store/nodo.store";
import { GrupoCabeceraStore, GrupoDetalleStore } from "../../core/store";
import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";

@Component({
    standalone: true,
    selector: 'grupo-nodo',
    imports: [
        CommonModule,
        CdkDropList,
        CdkDrag,
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
    @Input() dropListGroup: string[] = [];  // Lista de grupos conectados
    @Input() dropListId: string = '';  // ID único del grupo
    @Output() onDrop = new EventEmitter<CdkDragDrop<any>>(); // Emite cambio

    nodoStore = inject(NodoStore);
    grupoCabeceraStore = inject(GrupoCabeceraStore);
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
          return nodos.filter(n => !nodosDisponibles.includes(n.nodoDestino));
        });
    }

    getListaCabeceras() {
        let cabeceras = this.grupoCabeceraStore.grupoCabecera();
        return ["nodos-disponibles"].concat(
            cabeceras.map(c => 'cabecera-' + c.id)
        );
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

        if (container.id === 'nodos-disponibles') return;
        
        const isCabecera = (id: string) => id.startsWith('cabecera-');
        if(isCabecera(previousContainer.id) && isCabecera(container.id)) {            
            const grupoCabeceraDestinoId = parseInt(container.id.replace('cabecera-', ''));            
            this.grupoDetalleStore.updateGrupoDetalle({
              ...item.data,
              grupoCabeceraId: grupoCabeceraDestinoId
            });
            return;
        }
    }
}