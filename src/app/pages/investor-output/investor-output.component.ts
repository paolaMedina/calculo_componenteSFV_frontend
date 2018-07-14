import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { SourceFormBuilder } from '../../core/forms/source.form';
import { MatSnackBar } from '@angular/material';
import { FvFieldService } from '../../core/services';
import { FormGroup } from '@angular/forms';
import { InputSourceCircuitComponent } from '../../components/mppt-cabling/input-source-circuit/input-source-circuit.component';
import { Mttp, FvField } from '../../core/models';
import { routercTransition } from '../../router.animations';

@Component({
  selector: 'app-investor-output',
  templateUrl: './investor-output.component.html',
  styleUrls: ['./investor-output.component.scss'],
  animations:[ routercTransition()]
})
export class InvestorOutputComponent implements OnInit {
  fvField: FvField;
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
      this.fvField.investor_output.input = this._sourceFormBuilder.extractData(inputSourceForm, this.fvField.investor_output.input);
      this.fvField.investor_output.output = this._sourceFormBuilder.extractData(outputSourceForm, this.fvField.investor_output.output);
      this._fvFieldService.updateField(this.fvField);
      this._router.navigate(['/fv-field-config', this.fvField.id]);
    }
  }
  ngOnInit() {
    this._route.paramMap.subscribe( 
      (params: ParamMap) => {
        let fvFieldId = params.get('fv_id');
        let fvField = this._fvFieldService.get(fvFieldId);
        if ( fvField ) {
          this.fvField = this._fvFieldService.get(fvFieldId);
        }
      });
  }

}
