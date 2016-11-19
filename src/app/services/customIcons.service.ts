import { Injectable } from '@angular/core';

@Injectable()
export class CustomIconsService {
   edit = function () {
       this.className += ' dx-icon-edit icon';
       this.style.textDecoration = 'none';
       return '';
   };
   remove = function () {
       this.className += ' dx-icon-remove icon';
       this.style.textDecoration = 'none';
       return '';
   };

}