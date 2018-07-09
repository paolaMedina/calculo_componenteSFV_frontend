import { Injectable } from '@angular/core';
import { ManualSwitch, BaseData } from '../models';
import { ApiService } from './api.service';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
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
