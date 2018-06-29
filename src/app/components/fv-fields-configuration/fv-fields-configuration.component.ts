import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FvField } from '@app/core/models';
import { FvFieldService } from '@app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fv-fields-configuration',
  templateUrl: './fv-fields-configuration.component.html',
  styleUrls: ['./fv-fields-configuration.component.scss']
})
export class FvFieldsConfigurationComponent implements OnInit, OnDestroy {
  fvFields$: Observable<FvField[]>;
  fvFields: FvField[];
  constructor(
    private _fvFieldService: FvFieldService,
    private cd: ChangeDetectorRef
  ) {
    this.fvFields = new Array<FvField>();
  }

  ngOnInit() {
    this.fvFields = this._fvFieldService.getFvFields();
  }
  ngOnDestroy() {
    this.cd.detach(); // try this
    // for me I was detect changes inside "subscribe" so was enough for me to just unsubscribe;
  }
}
