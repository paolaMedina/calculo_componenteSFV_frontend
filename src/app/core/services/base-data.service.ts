import { Injectable } from '@angular/core';
import { ManualSwitch } from '@app/core/models';
import { ApiService } from '@app/core/services/api.service';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  _manual_switches: ManualSwitch[];
  constructor(private apiService: ApiService) { 

  }
  getManualSwithches(): Observable<ManualSwitch[]> {
    if( this._manual_switches ) {
      return of(this._manual_switches);
    } else {
     return this.apiService.get('').pipe( tap(
        (manual_switches: ManualSwitch[]) => {
          this._manual_switches = manual_switches;
        }
      ))
    }
  }
  
}
