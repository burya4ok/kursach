import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class TrainingUnitService {

    getTrainingUnits(loadOptions: any): any[]{
        return ipcRenderer.sendSync('getTrainingUnits', loadOptions);
    }

    insertTrainingUnits(data): any[]{
        return ipcRenderer.sendSync('insertTrainingUnits', data);
    }

    updateTrainingUnits(data): any[]{
        return ipcRenderer.sendSync('updateTrainingUnits', data);
    }

    deleteTrainingUnits(id): any[]{
        return ipcRenderer.sendSync('deleteTrainingUnits', {id: id});
    }

    countTrainingUnits(): any[]{
        return ipcRenderer.sendSync('countTrainingUnits');
    }
}