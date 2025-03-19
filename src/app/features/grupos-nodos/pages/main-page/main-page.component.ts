import { Component, inject } from "@angular/core";
import { GruposNodosStore } from "../../core/store/grupos-nodos.store";
import { GrupoComponent } from "../../components/grupo/grupo.component";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'grupos-nodos-main',
    imports: [
        CommonModule,
        GrupoComponent,
        MatIconModule,
        MatButtonModule,
        FormsModule, 
    ],
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    providers: [GruposNodosStore]
})
export class MainPage {
    gruposNodosStore = inject(GruposNodosStore);
    dropListGroupIds: string[] = [];
    searchQuery: string = ""; 

    ngOnInit() {
        this.gruposNodosStore.loadGrupos();
        this.gruposNodosStore.loadNodos();
        this.updateDropListGroup();
    }

    updateDropListGroup() {
        this.dropListGroupIds = ["nodos-sin-asignar"].concat(
            this.gruposNodosStore.grupos().map(g => 'grupo-' + g.id)
        );
    }

    getUnassignedNodes() {
        // Obtener todos los nodos
        const allNodes = this.gruposNodosStore.nodos();
    
        // Obtener todos los nodos que ya están en grupos
        const assignedNodes = this.gruposNodosStore.grupos().flatMap(g => g.content);
    
        // Filtrar los nodos que NO están en la lista de asignados
        return allNodes.filter(node => !assignedNodes.some(n => n.id === node.id));
    }    
    
    // Función para verificar si un grupo debe ser resaltado
    isGroupHighlighted(grupo: any): boolean {
        if(grupo == undefined || grupo == null) return false;
        if(this.searchQuery != '' && grupo.length > 1){
            const nodesInGroup = grupo;
            return grupo.some((node: any) => 
                node.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                node.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                node.id.toString().includes(this.searchQuery)
            );
        }
        return false;
    }
    
    // Función para obtener el trackBy
    trackById(index: number, item: any): any {
        return item.id;
    }

    drop(event: CdkDragDrop<any>) {
        const { previousIndex, currentIndex, container, previousContainer } = event;
    
        // Clonar el estado actual de los grupos
        const grupos = [...this.gruposNodosStore.grupos()];
    
        if (previousContainer.id === "nodos-sin-asignar") {
            // Mover nodo desde "Nodos sin asignar" a un grupo
            const unassignedNodes = this.getUnassignedNodes();
            const newGrupo = grupos.find(g => 'grupo-' + g.id === container.id);
            if (!newGrupo) return;
    
            transferArrayItem(unassignedNodes, newGrupo.content, previousIndex, currentIndex);
        } else if (container.id === "nodos-sin-asignar") {
            // Mover nodo desde un grupo a "Nodos sin asignar"
            const prevGrupo = grupos.find(g => 'grupo-' + g.id === previousContainer.id);
            if (!prevGrupo) return;
    
            const unassignedNodes = this.getUnassignedNodes();
    
            transferArrayItem(prevGrupo.content, unassignedNodes, previousIndex, currentIndex);
        } else {
            // Movimiento entre grupos
            const prevGrupo = grupos.find(g => 'grupo-' + g.id === previousContainer.id);
            const newGrupo = grupos.find(g => 'grupo-' + g.id === container.id);
            if (!prevGrupo || !newGrupo) return;
    
            if (previousContainer === container) {
                moveItemInArray(newGrupo.content, previousIndex, currentIndex);
            } else {
                transferArrayItem(prevGrupo.content, newGrupo.content, previousIndex, currentIndex);
            }
        }
    
        // Actualizar el estado en el store
        this.gruposNodosStore.changeNodoGroup(grupos);
    }
    
    deleteGroup(groupIdstr: string) {
        const groupId = +groupIdstr.split('-')[1];
        const grupos = [...this.gruposNodosStore.grupos()];
    
        // Encontrar el grupo a eliminar
        const grupoIndex = grupos.findIndex(g => g.id === groupId);
        if (grupoIndex === -1) return;
    
        // Obtener nodos del grupo eliminado
        const unassignedNodes = this.getUnassignedNodes();
        const nodosGrupo = grupos[grupoIndex].content;
    
        // Devolver los nodos al grupo de "Nodos sin asignar"
        unassignedNodes.push(...nodosGrupo);
    
        // Eliminar el grupo
        grupos.splice(grupoIndex, 1);
    
        // Actualizar el estado en el store
        this.gruposNodosStore.changeNodoGroup(grupos);
    }
    
    clearAllNodes(groupIdstr: string) {
        const groupId = +groupIdstr.split('-')[1];
        const grupos = [...this.gruposNodosStore.grupos()];
        const grupo = grupos.find(g => g.id === groupId);
        if (!grupo) return;
    
        // Obtener nodos sin asignar y transferir los del grupo
        const unassignedNodes = this.getUnassignedNodes();
        unassignedNodes.push(...grupo.content);
    
        // Vaciar el grupo
        grupo.content = [];
    
        // Actualizar el estado en el store
        this.gruposNodosStore.changeNodoGroup(grupos);
    }

    saveGruposNodos() {
        const grupos = this.gruposNodosStore.grupos(); // Obtener todos los grupos
        // Imprimir los detalles de los grupos
        console.log('Detalles de los Grupos:');
        grupos.forEach(grupo => {
            console.log(`Grupo ID: ${grupo.id}, Nombre: ${grupo.name}`);
            console.log('Nodos del grupo:');
            grupo.content.forEach(nodo => {
                console.log(`  Nodo ID: ${nodo.id}, Nombre: ${nodo.name}, Direccion: ${nodo.address}`);
            });
            console.log('--------------------------');
        });
    
        // Imprimir los nodos no asignados
        const nodosNoAsignados = this.getUnassignedNodes();
        console.log('Detalles de los Nodos No Asignados:');
        nodosNoAsignados.forEach(nodo => {
            console.log(`Nodo ID: ${nodo.id}, Nombre: ${nodo.name}`);
        });
        console.log('===========================');
    }

    generarIdUnico(): number {
        const grupos = this.gruposNodosStore.grupos();
        return grupos.length > 0 ? Math.max(...grupos.map(g => g.id)) + 1 : 1;
    }
      
    addGroup() {
        const grupos = [...this.gruposNodosStore.grupos()];  // Clonamos el estado actual de los grupos
    
        // Crear el nuevo grupo con un ID único (puedes usar otro método para generar un ID si es necesario)
        const nuevoGrupo = {
          id: this.generarIdUnico(),  // Generamos un ID único
          name: "Grupo - Sin Nombre",               // Nombre del grupo (puede ser el que pases como parámetro)
          content: []                 // El grupo está vacío inicialmente
        };
    
        // Agregar el nuevo grupo al array de grupos
        grupos.push(nuevoGrupo);
    
        // Actualizar el estado en el store
        this.gruposNodosStore.changeNodoGroup(grupos);
    
        this.updateDropListGroup();
      }
}