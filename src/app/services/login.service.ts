import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class LoginService {
    setTypeOfUser(type: string): void{
        ipcRenderer.send('setTypeOfUser', type);
    }

    getTypeOfUser(): string{
        return ipcRenderer.sendSync('getTypeOfUser');
    }

    deleteTypeOfUser(): void{
        ipcRenderer.send('deleteTypeOfUser');
    }
}