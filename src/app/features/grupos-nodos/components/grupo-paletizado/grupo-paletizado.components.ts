import { 
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal
} from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { GrupoCabeceraPage } from "../grupo-cabecera/grupo-cabecera.components";
import { MatSelectModule } from '@angular/material/select';
import { 
  GrupoCabeceraStore,
  GrupoPaletizadoStore
} from "../../core/store";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { AddGrupoPaletizadoDialog } from "../dialog-add/grupo-paletizado/grupo-paletizado.dialog";
import { AddGrupoCabeceraDialog } from "../dialog-add/grupo-cabecera/grupo-cabecera.dialog";
import { NodoStore } from "../../core/store/nodo.store";

@Component({
    standalone: true,
    selector: 'grupo-paletizado',
    imports: [
    CommonModule,
    GrupoCabeceraPage,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule, 
],
    templateUrl: './grupo-paletizado.component.html',
    styleUrls: ['./grupo-paletizado.component.scss'],
    providers: []
})
export class GrupoPaletizadoPage implements OnInit {
    @Input() dropHandler!: (event: CdkDragDrop<any[]>) => void;
    grupoPaletizadoStore = inject(GrupoPaletizadoStore);
    grupoCabeceraStore = inject(GrupoCabeceraStore);
    nodoStore = inject(NodoStore);
    searchQuery = signal('');
    dialog = inject(MatDialog);
    
    ngOnInit(): void {
        this.grupoPaletizadoStore.loadGrupoPaletizado();
        this.grupoCabeceraStore.loadGrupoCabecera();        
    }

    grupoPaletizado = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        return this.grupoPaletizadoStore.grupoPaletizado().filter(g => {
            const nombreMatch = g.nombre?.toLowerCase().includes(query);
            const idMatch = g.id?.toString().includes(query);
            return nombreMatch || idMatch;
        });
    });


    listNodo = computed(() => {
        return this.nodoStore.nodo();
    });
    
    getGrupoCabecera(paletizadoId: number) {
        return computed(() =>
          this.grupoCabeceraStore.grupoCabecera().filter(g => g.grupoPaletizadoId === paletizadoId)
        );
    }

    openDialogGrupoPaletizado() {
      this.dialog.open(AddGrupoPaletizadoDialog, {})        
      .afterClosed()
      .subscribe(result => {
          if (result) {
              console.log('Resultado del diálogo:', result);
              this.grupoPaletizadoStore.addGrupoPaletizado(result);
          }
      });
    }
    
    openDialogGrupoCabecera(grupoPaletizado: number) {
      this.dialog.open(AddGrupoCabeceraDialog, {
          data: {
              nodos: this.listNodo(),
              grupoPaletizado: grupoPaletizado
          }
      })        
      .afterClosed()
      .subscribe(result => {
          if (result) {
              console.log('Resultado del diálogo:', result);
              this.grupoCabeceraStore.addGrupoCabecera(result);
          }
      });
  }  
}