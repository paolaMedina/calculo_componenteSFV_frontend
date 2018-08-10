import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { SourceFormBuilder } from '../../core/forms/source.form';
import { MatSnackBar } from '@angular/material';
import { FvFieldService } from '../../core/services';
import { FormGroup } from '@angular/forms';
import { InputSourceCircuitComponent } from '../../components/mppt-cabling/input-source-circuit/input-source-circuit.component';
import { Mttp, FvField } from '../../core/models';
import { routercTransition } from '../../router.animations';
import { NgxGalleryComponent, INgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { galleryOptionsFullScreenOnly } from '../../core/const';
import { APP_BASE_HREF } from "@angular/common";

@Component({
  selector: 'app-investor-output',
  templateUrl: './investor-output.component.html',
  styleUrls: ['./investor-output.component.scss'],
  animations:[ routercTransition()]
})
export class InvestorOutputComponent implements OnInit {
  fvField: FvField;
  galleryImageOptions = galleryOptionsFullScreenOnly;
  helpImages: INgxGalleryImage[] = [{
    big: `${this.baseHref}/assets/img/cableado-help.png`
  }];
  @ViewChild('helpImage') onlyPreviewGallery: NgxGalleryComponent;

  @ViewChild('inputSource') inputSourceCircuitComponent: InputSourceCircuitComponent;
  @ViewChild('outputSource') outputSourceCircuitComponent: InputSourceCircuitComponent;
  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private _fvFieldService: FvFieldService,
    private _sourceFormBuilder: SourceFormBuilder,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }
  openHelpImage() {
    this.onlyPreviewGallery.openPreview(0);
  }
  saveData() {
    let outputSourceForm = this.outputSourceCircuitComponent.sourceForm;
    this._sourceFormBuilder.markFormGroupTouched(outputSourceForm);
    if ( !outputSourceForm.valid ) {
      this._snackBar.open("Se han enontrado algunos errores en el circuito de salida", "Aceptar", {
        duration: 3000,
      });
      return;
    } else {
      this.fvField.salida_inversor.output = this._sourceFormBuilder.extractData(outputSourceForm, this.fvField.salida_inversor.output);
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
