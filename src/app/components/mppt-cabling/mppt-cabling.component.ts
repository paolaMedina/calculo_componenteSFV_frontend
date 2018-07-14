import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Mttp, Source, FvField } from '../../core/models';
import { InputSourceCircuitComponent } from './input-source-circuit/input-source-circuit.component';
import { FvFieldService } from '../../core/services';
import { FormGroup } from '@angular/forms';
import { SourceFormBuilder } from '../../core/forms/source.form';

@Component({
  selector: 'app-mppt-cabling',
  templateUrl: './mppt-cabling.component.html',
  styleUrls: ['./mppt-cabling.component.scss']
})
export class MpptCablingComponent implements OnInit {
  mttp: Mttp;
  fvFieldId: string;
  @ViewChild('inputSource') inputSourceCircuitComponent: InputSourceCircuitComponent;
  @ViewChild('outputSource') outputSourceCircuitComponent: InputSourceCircuitComponent;
  constructor(
    private _fvFieldService: FvFieldService,
    private _sourceFormBuilder: SourceFormBuilder,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
  saveData() {
    let inputSourceForm = this.inputSourceCircuitComponent.sourceForm;
    let outputSourceForm = this.outputSourceCircuitComponent.sourceForm;
    this.markFormGroupTouched(inputSourceForm);
    this.markFormGroupTouched(outputSourceForm);
    if ( !inputSourceForm.valid ) {
      this._snackBar.open("Se han enontrado algunos errores, en el circuito fuente", "Aceptar", {
        duration: 3000,
      });
      return;
    } else if ( !outputSourceForm.valid ) {
      this._snackBar.open("Se han enontrado algunos errores en el circuito de salida", "Aceptar", {
        duration: 3000,
      });
      return;
    } else {
      this.mttp.cabling.input = this._sourceFormBuilder.extractData(inputSourceForm, this.mttp.cabling.input);
      this.mttp.cabling.output = this._sourceFormBuilder.extractData(outputSourceForm, this.mttp.cabling.output);
      this._router.navigate(['mppts-config', this.fvFieldId]);
    }
  }
  ngOnInit() {
    this.mttp = new Mttp('');
    this.mttp = new Mttp('');
    this._route.paramMap.subscribe( 
      (params: ParamMap) => {
        let fvFieldId = params.get('fv_id');
        this.fvFieldId = fvFieldId;
        let idMttp = params.get('mttp_id');
        let fvField = this._fvFieldService.get(fvFieldId);
        if ( fvField ) {
          let mttp: Mttp  = this._fvFieldService.get(this.fvFieldId).mttps.find(mttp => mttp.id === idMttp);
          this.mttp = mttp;
        }
      });
  }

}
