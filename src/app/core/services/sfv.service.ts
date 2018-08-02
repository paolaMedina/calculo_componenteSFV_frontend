import { Injectable } from '@angular/core';
import { Sfv } from '../../core/models';
import { sfv_mock } from '../../mocks';
import { ApiService } from '@app/core/services/api.service';

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
  send(sfv: Sfv) {
    this.apiService.post('postData', sfv);
  }
  constructor(private apiService: ApiService) {
    this.sfv = new Sfv();
    // load mock 
   //
    //this.sfv = sfv_mock;
   }

}
