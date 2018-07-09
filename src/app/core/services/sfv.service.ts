import { Injectable } from '@angular/core';
import { Sfv } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SfvService {
  sfv: Sfv;

  get(): Sfv {
    return this.sfv;
  }
  set(sfv: Sfv) {
    this.sfv = sfv;
  }
  constructor() {
    this.sfv = new Sfv();
   }
}
