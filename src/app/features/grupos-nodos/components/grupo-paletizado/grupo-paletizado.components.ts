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
import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { AddGrupoPaletizadoDialog } from "../dialog-add/grupo-paletizado/grupo-paletizado.dialog";
import { AddGrupoCabeceraDialog } from "../dialog-add/grupo-cabecera/grupo-cabecera.dialog";
import { NodoStore } from "../../core/store/nodo.store";
import { Cabecera } from "../../core/interfaces";
import { ConfirmDialogComponent } from "../dialog/confirm.dialog";

@Component({
    standalone: true,
    selector: 'grupo-paletizado',
    imports: [
        CommonModule,
        CdkDropList,
        GrupoCabeceraPage,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
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
        let gruposPaletizados = this.grupoPaletizadoStore.grupoPaletizado().filter(g => {
            const nombreMatch = g.nombre?.toLowerCase().includes(query);
            const idMatch = g.id?.toString().includes(query);
            return nombreMatch || idMatch;
        });
        console.log(gruposPaletizados);
        return gruposPaletizados;
    });

    getListaPaletizados(): string[] {
        return this.grupoPaletizado().map(p => 'paletizado-' + p.id);
    }

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
              this.grupoCabeceraStore.addGrupoCabecera(result);
          }
      });
    }  


    drop(event: CdkDragDrop<any>) {
        const { container, previousContainer, item } = event; 
        console.log(item);         
        if (container.id !== previousContainer.id) {
            const grupoPaletizadoId = parseInt(container.id.replace('paletizado-', ''));
            const {...cabecera} = item.data;
            console.log( {
                    ...cabecera,
                    grupoPaletizadoId: grupoPaletizadoId,
                });
            
            const update: Cabecera = {
                ...cabecera,
                grupoPaletizadoId: grupoPaletizadoId,
            }
            this.grupoCabeceraStore.updateGrupoCabecera(update);
        }
      }
      
      extractPaletizadoId(id: string): number {
        return +id.replace('paletizado-', '');
    }

    deletePaletizado(paletizadoId: number) {
            this.dialog.open(ConfirmDialogComponent, {
                data: {
                title: '¿Eliminar grupo paletizado?',
                message: `¿Estás seguro que querés eliminar el paletizado #${paletizadoId}?`
                }
            }).afterClosed().subscribe(result => {
                if (result) {
                    this.grupoPaletizadoStore.deleteGrupoPaletizado(paletizadoId);
                }
            });
    }

}