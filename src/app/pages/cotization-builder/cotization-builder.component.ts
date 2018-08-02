import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sfv, FvField } from '@app/core/models';
import { SfvService, FvFieldService } from '@app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cotization-builder',
  templateUrl: './cotization-builder.component.html',
  styleUrls: ['./cotization-builder.component.scss']
})
export class CotizationBuilderComponent implements OnInit {
  isLinear = false;
  sfv: Sfv;
  fvFields$: Observable<FvField[]>;
  fvFields: FvField[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _sfvService: SfvService,
    private _formBuilder: FormBuilder
  ) {
    this.fvFields$.subscribe( (fvFields: FvField[]) => {
      this.fvFields =fvFields;
    });
  }
  printFields(){
  }
  ngOnInit() {
    this.sfv = this._sfvService.get();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
