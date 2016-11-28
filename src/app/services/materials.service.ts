import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class MaterialsService {

    getAllMaterials(loadOptions: any): any[]{
        return ipcRenderer.sendSync('getAllMaterials', loadOptions);
    }
    getMaterialsByType(type: string, unit?: string): any[]{
        let selectors = {};
        if (unit) {
            selectors = {
                type: type,
                unit: unit
            }
        } else {
            selectors = {
                type: type
            }
        }
        return ipcRenderer.sendSync('getMaterialsByType', selectors);
    }
    getTypes(): any[]{
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
    countMaterials(): number{
        return ipcRenderer.sendSync('countMaterials');
    }

}