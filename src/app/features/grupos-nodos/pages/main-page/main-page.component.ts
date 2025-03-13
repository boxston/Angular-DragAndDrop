import { Component, inject } from "@angular/core";
import { GruposNodosStore } from "../../core/store/grupos-nodos.store";
import { GrupoComponent } from "../../components/grupo/grupo.component";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
    standalone: true,
    selector: 'grupos-nodos-main',
    imports: [
        GrupoComponent,
    ],
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    providers: [GruposNodosStore]
})
export class MainPage {
    gruposNodosStore = inject(GruposNodosStore);
    dropListGroupIds: string[] = [];

    ngOnInit() {
        this.gruposNodosStore.loadGrupos();
        this.updateDropListGroup();
    }

    updateDropListGroup() {
        this.dropListGroupIds = this.gruposNodosStore.grupos().map(g => 'grupo-' + g.id);
    }

    drop(event: CdkDragDrop<any>) {
        const { previousIndex, currentIndex, container, previousContainer } = event;

        // Clonar el estado actual de los grupos
        const grupos = [...this.gruposNodosStore.grupos()];

        // Buscar los grupos involucrados en el movimiento
        const prevGrupo = grupos.find(g => 'grupo-' + g.id === previousContainer.id);
        const newGrupo = grupos.find(g => 'grupo-' + g.id === container.id);

        if (!prevGrupo || !newGrupo) return;

        if (previousContainer === container) {
            // Movimiento dentro del mismo grupo
            moveItemInArray(newGrupo.content, previousIndex, currentIndex);
        } else {
            // Movimiento entre diferentes grupos
            transferArrayItem(
                prevGrupo.content,
                newGrupo.content,
                previousIndex,
                currentIndex
            );
        }

        // Usar el Store para actualizar el estado global
        this.gruposNodosStore.changeNodoGroup(grupos);
    }
}