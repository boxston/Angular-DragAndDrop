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
import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { NodoStore } from "../../core/store/nodo.store";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../dialog/confirm.dialog";
import { Cabecera } from "../../core/interfaces";

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
    @Input() dropHandler!: (event: CdkDragDrop<any[]>) => void;
    
    @Input() id: number = 0;
    @Input() cabecera: Cabecera | null = null;
    @Input() grupoPaletizado: number | null = null;   
    @Input() nodoDestinatario: number | null = null;
    @Input() plazaRuteo: number | null = null;

    grupoCabeceraStore = inject(GrupoCabeceraStore);
    grupoDetalleStore = inject(GrupoDetalleStore);
    nodoStore = inject(NodoStore);
    dialog = inject(MatDialog);

    constructor() {}
    
    ngOnInit(): void {
        this.grupoDetalleStore.loadGrupoDetalle();
    }

    grupoDetalle = computed(() =>
        this.grupoDetalleStore.grupoDetalle().filter(g => g.grupoCabeceraId === this.id)
    );

    listNodo = computed(() => {
        return this.nodoStore.nodo();
    });

    getListaCabeceras() {
        let cabeceras = this.grupoCabeceraStore.grupoCabecera();
        return ["nodos-disponibles"].concat(
            cabeceras.map(c => 'cabecera-' + c.id)
        );
    }

    deleteCabecera() {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
            title: '¿Eliminar grupo cabecera?',
            message: `¿Estás seguro que querés eliminar la cabecera #${this.id}?`
            }
        }).afterClosed().subscribe(result => {
            if (result) {
            this.grupoCabeceraStore.deleteGrupoCabecera(this.id);
            }
        });
    }

    onNodoDestinatarioChange(event: any) {
        this.nodoDestinatario = event.value;
        this.grupoCabeceraStore.updateGrupoCabecera({ ...this.cabecera!, nodoDestinatarioId: event.value });
    }
    onPlazaRuteoChange(event: any) {
        this.plazaRuteo = event.value;
        this.grupoCabeceraStore.updateGrupoCabecera({ ...this.cabecera!, nodoPlazaRuteoId: event.value });
    }
}
