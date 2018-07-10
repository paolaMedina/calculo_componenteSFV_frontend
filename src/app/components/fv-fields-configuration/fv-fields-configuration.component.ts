import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FvField, Sfv } from '../../core/models';
import { FvFieldService, SfvService } from '../../core/services';
import { Observable } from 'rxjs';
import { InvestorTypeEnum } from '../../core/enums';

@Component({
  selector: 'app-fv-fields-configuration',
  templateUrl: './fv-fields-configuration.component.html',
  styleUrls: ['./fv-fields-configuration.component.scss']
})
export class FvFieldsConfigurationComponent implements OnInit, OnDestroy {
  fvFields: FvField[]; // should never access it directly 
  sfv: Sfv;
  allow_add_and_delete: boolean;
  constructor(
    private _fvFieldService: FvFieldService,
    private cd: ChangeDetectorRef,
    private _sfvService: SfvService
  ) {
    this.fvFields = new Array<FvField>();
    this._fvFieldService.getFvFieldsObservable().subscribe( (fvFields: FvField[]) => {
      console.log(fvFields);
      this.fvFields = fvFields;
    }
  );
  }

  ngOnInit() {
    this.sfv = this._sfvService.get();
    if ( this.sfv.investor_type === InvestorTypeEnum.MicroInvestor ) {
      this._fvFieldService.eliminateAllFieldsExceptFirst();
      this.allow_add_and_delete = false;
    } else {
      this.allow_add_and_delete = true;
    }
    this._fvFieldService.publishFvFields();
  }
  deleleteFvField( idFvField: string ) {
    this._fvFieldService.deleteFvField(idFvField);
  }
  addDefaultFvField() {
    this._fvFieldService.addDefaultFvField();
  }
  ngOnDestroy() {
    this.cd.detach(); // try this
    // for me I was detect changes inside "subscribe" so was enough for me to just unsubscribe;
  }
}
