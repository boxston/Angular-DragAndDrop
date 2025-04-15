import { Component, computed, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatList, MatListItem } from "@angular/material/list";
import { GrupoCabeceraStore, GrupoDetalleStore } from "../../core/store";
import { CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem } from "@angular/cdk/drag-drop";
import { Detalle } from "../../core/interfaces";

@Component({
    standalone: true,
    selector: 'grupo-cabecera',
    imports: [
        CommonModule,
        CdkDropList,
        CdkDrag,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatList,
        MatListItem,
        MatSelectModule
    ],
    templateUrl: './grupo-cabecera.component.html',
    styleUrls: ['./grupo-cabecera.component.scss'],
    providers: []
})
export class GrupoCabeceraPage implements OnInit {
    @Input() dropListGroup: string[] = [];  // Lista de grupos conectados
    @Input() dropListId: string = '';  // ID único del grupo

    @Input() id: number = 0;
    @Input() grupoPaletizado: number = 0;   
    @Input() nodoDestinatario: number = 0;
    @Input() plazaRuteo: number = 0;

    grupoCabeceraStore = inject(GrupoCabeceraStore);
    grupoDetalleStore = inject(GrupoDetalleStore);

    constructor() {}
    
    ngOnInit(): void {
        this.grupoDetalleStore.loadGrupoDetalle();
    }

    grupoDetalle = computed(() =>
        this.grupoDetalleStore.grupoDetalle().filter(g => g.grupoCabeceraId === this.id)
    );

    getListaCabeceras() {
        let cabeceras = this.grupoCabeceraStore.grupoCabecera();
        return ["nodos-disponibles"].concat(
            cabeceras.map(c => 'cabecera-' + c.id)
        );
    }

    drop(event: CdkDragDrop<any[]>) {
        const { container, previousContainer, item } = event;
        if (previousContainer.id === container.id) return;
        console.log(previousContainer.id, container.id);
        if (previousContainer.id === 'nodos-disponibles') {                     
            const grupoCabeceraDestinoId = parseInt(container.id.replace('cabecera-', ''));            
           console.log({
            ...item.data,
            grupoCabeceraId: grupoCabeceraDestinoId
          });
           
            this.grupoDetalleStore.addGrupoDetalle({
              ...item.data,
              grupoCabeceraId: grupoCabeceraDestinoId
            });
        }

        if (container.id === 'nodos-sin-asignar') return;
        
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
