import { Injectable } from '@angular/core';
import { ManualSwitch, BaseData, InversorFactory } from '../models';
import { ApiService } from './api.service';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  inversorFactory: InversorFactory = new InversorFactory();
  _manual_switches: ManualSwitch[];
  _baseData: BaseData;
  constructor(private apiService: ApiService) {

  }
  getBaseData(): Observable<BaseData> {
    if (this._baseData) {
      return of(this._baseData);
    } else {
      return this.apiService.get('csvData')
        .pipe(
          tap(
            (base_data: BaseData) => {
              this._baseData = base_data;
              this._baseData.inversores = this.inversorFactory.makeMultiple(base_data.inversores)
              console.log(this._baseData.inversores)
            }
          )
        );
    }
  }
  getManualSwithches(): Observable<ManualSwitch[]> {
    if (this._manual_switches) {
      return of(this._manual_switches);
    } else {
      return this.apiService.get('interruptoresManuales').
        pipe(
          tap(
            (manual_switches: ManualSwitch[]) => {
              this._manual_switches = manual_switches;
            }
          ))
    }
  }

}
