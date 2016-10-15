import { Injectable } from '@angular/core';


@Injectable()
export class LoginService {
    setTypeOfUser(type: string): void{
        localStorage.setItem('typeOfUser', type);
    }

    getTypeOfUser(): string{
        return localStorage.getItem('typeOfUser');
    }

    deleteTypeOfUser(): void{
        localStorage.removeItem('typeOfUser');
    }
}