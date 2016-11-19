import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class MaterialsService {

    getAllMaterials(): any[]{
        return ipcRenderer.sendSync('getAllMaterials');
    }
    getMaterialsByType(type: string): any[]{
        return ipcRenderer.sendSync('getMaterialsByType', {type: type});
    }
    getTypes(): boolean{
        return ipcRenderer.sendSync('getTypes');
    }
    insertMaterial(material: any): boolean{
        return ipcRenderer.sendSync('insertMaterial', material);
    }
    updateMaterial(material: any): boolean{
        return ipcRenderer.sendSync('updateMaterial', material);
    }
    deleteMaterial(id: number): boolean{
        return ipcRenderer.sendSync('deleteMaterial', {id: id});
    }

}