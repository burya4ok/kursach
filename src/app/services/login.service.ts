import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class LoginService {
    setTypeOfUser(type: string): void{
        ipcRenderer.send('setTypeOfUser', type);
    }

    getTypeOfUser(): Promise<any>{
        ipcRenderer.send('getTypeOfUser');
        return new Promise(function (resolve, reject) {
            ipcRenderer.on('typeOfUser', function (type) {
                resolve(type);
            })
        })
    }

    deleteTypeOfUser(): void{
        ipcRenderer.send('deleteTypeOfUser');
    }
}