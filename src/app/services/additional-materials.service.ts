import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class AdditionalMaterialsService {

    getAllMaterials(loadOptions: any): any[]{
        return ipcRenderer.sendSync('getAllMaterialsAdditional', loadOptions);
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
        return ipcRenderer.sendSync('getMaterialsByTypeAdditional', selectors);
    }
    getTypes(): any[]{
        return ipcRenderer.sendSync('getTypesAdditional');
    }
    insertMaterial(material: any): boolean{
        return ipcRenderer.sendSync('insertMaterialAdditional', material);
    }
    updateMaterial(material: any): boolean{
        return ipcRenderer.sendSync('updateMaterialAdditional', material);
    }
    deleteMaterial(id: number): boolean{
        return ipcRenderer.sendSync('deleteMaterialAdditional', {id: id});
    }
    countMaterials(): number{
        return ipcRenderer.sendSync('countMaterialsAdditional');
    }

}