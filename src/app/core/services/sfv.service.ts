import { Injectable } from '@angular/core';
import { Sfv } from '../../core/models';
import { sfv_mock } from '../../mocks';

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
    // load mock 
    //this.sfv = sfv_mock;
   }

}
