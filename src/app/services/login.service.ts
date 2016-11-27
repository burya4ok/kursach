import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class LoginService {
    public title: string;
    public hide: boolean;

    constructor() {
        this.hide = false;
    }
    setTypeOfUser(type: string): void{
        ipcRenderer.send('setTypeOfUser', type);
    }

    getTypeOfUser(): string{
        return ipcRenderer.sendSync('getTypeOfUser');
    }

    deleteTypeOfUser(): void{
        ipcRenderer.send('deleteTypeOfUser');
    }

    checkPassword(type: string, password: string): boolean {
        return ipcRenderer.sendSync('checkPassword', {type: type, password: password});
    }

    setTitle(title: string): void {
        this.title = title;
    };

    getTitle(): string{
        return this.title ;
    };

    hideMenu(data) {
        this.hide = data;
    }
}