import { Component, computed, EventEmitter, inject, Input, OnInit, Output, signal } from "@angular/core";
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
    @Input() dropHandler!: (event: CdkDragDrop<any[]>) => void;
    @Input() dropListGroup: string[] = [];  // Lista de grupos conectados
    @Input() dropListId: string = '';  // ID único del grupo
    @Output() onDrop = new EventEmitter<CdkDragDrop<any>>(); // Emite cambio

    nodoStore = inject(NodoStore);
    grupoCabeceraStore = inject(GrupoCabeceraStore);
    grupoDetalleStore = inject(GrupoDetalleStore);
    
    searchQuery = signal('');

    constructor() {}
    
    ngOnInit(): void {
        this.nodoStore.loadNodo();
        this.grupoDetalleStore.loadGrupoDetalle();
    }


    nodosDisponibles = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        const nodos = this.nodoStore.nodo();
        const nodosAsignados = this.grupoDetalleStore.grupoDetalle().map(g => g.nodoDestino);
    
        return nodos
            .filter(n => !nodosAsignados.includes(n.nodoDestino))
            .filter(n => {
                return (
                    n.nodoCodigo?.toString().toLowerCase().includes(query) ||
                    n.nodoDescripcion?.toLowerCase().includes(query)
                );
            });
    });

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
}