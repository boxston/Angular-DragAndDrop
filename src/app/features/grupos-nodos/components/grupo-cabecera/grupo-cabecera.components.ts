import { Component, computed, inject, Input, OnInit } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatList, MatListItem } from "@angular/material/list";
import { GrupoDetalleStore } from "../../core/store";

@Component({
    standalone: true,
    selector: 'grupo-cabecera',
    imports: [
        CommonModule,
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
    @Input() id: number = 0;
    @Input() grupoPaletizado: number = 0;   
    @Input() nodoDestinatario: number = 0;
    @Input() plazaRuteo: number = 0;
    grupoDetalleStore = inject(GrupoDetalleStore);
    
    constructor() {}
    
    ngOnInit(): void {
        this.grupoDetalleStore.loadGrupoDetalle();
    }

    getGrupoDetalle() {
        return computed(() =>
            this.grupoDetalleStore.grupoDetalle().filter(g => g.grupoCabeceraId === this.id)
        );
    }
}
