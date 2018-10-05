import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { routercTransition } from '@app/router.animations';
import { FvField, Sfv } from '@app/core/models';
import { galleryOptionsFullScreenOnly } from '@app/core/const';
import { INgxGalleryImage, NgxGalleryComponent } from '../../../../node_modules/ngx-gallery';
import { InputSourceCircuitComponent } from '@app/components/mppt-cabling/input-source-circuit/input-source-circuit.component';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';
import { FvFieldService, SfvService } from '@app/core/services';
import { SourceFormBuilder } from '@app/core/forms/source.form';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { ActivatedRoute, Router, ParamMap } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-combinacion-inversor',
  templateUrl: './combinacion-inversor.component.html',
  styleUrls: ['./combinacion-inversor.component.scss'],
  animations:[ routercTransition()]
})
export class CombinacionInversorComponent implements OnInit {

  fvField: FvField;
  sfv: Sfv;
  galleryImageOptions = galleryOptionsFullScreenOnly;
  helpImages: INgxGalleryImage[] = [{
  big: `${this.baseHref}/assets/img/cableado-help.png`
  }];
  @ViewChild('helpImage') onlyPreviewGallery: NgxGalleryComponent;
  @ViewChild('inputSource') inputSourceCircuitComponent: InputSourceCircuitComponent;

  constructor(@Inject(APP_BASE_HREF) private baseHref: string,
  private _fvFieldService: FvFieldService,
  private _sourceFormBuilder: SourceFormBuilder,
  private _snackBar: MatSnackBar,
  private _route: ActivatedRoute,
  private _router: Router,
  private _sfvService: SfvService,
  ) { 
    this.fvField  = new FvField();
    this.sfv= _sfvService.get();
  }

  openHelpImage() {
    this.onlyPreviewGallery.openPreview(0);
  }
  saveData() {
    let inputSourceForm = this.inputSourceCircuitComponent.sourceForm;
    this._sourceFormBuilder.markFormGroupTouched(inputSourceForm);
    if ( !inputSourceForm.valid ) {
      this._snackBar.open("Se han enontrado algunos errores en la combinación de inversores", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    } else {
      this.sfv.combinacion_inversor.input = this._sourceFormBuilder.extractData(inputSourceForm, this.sfv.combinacion_inversor.input);
      this._router.navigate(['/fv-fields-config']);
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
