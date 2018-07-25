import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NgxGalleryOptions, INgxGalleryImage, NgxGalleryComponent } from 'ngx-gallery';


import { Mttp } from '../../core/models';
import { InputSourceCircuitComponent } from './input-source-circuit/input-source-circuit.component';
import { FvFieldService } from '../../core/services';
import { SourceFormBuilder } from '../../core/forms/source.form';
import { routercTransition } from '../../router.animations';
import { galleryOptionsFullScreenOnly } from '../../core/const';


@Component({
  selector: 'app-mppt-cabling',
  templateUrl: './mppt-cabling.component.html',
  styleUrls: ['./mppt-cabling.component.scss'],
  animations: [routercTransition()]
})
export class MpptCablingComponent implements OnInit {
  mttp: Mttp;
  galleryImageOptions = galleryOptionsFullScreenOnly;
  helpImages: INgxGalleryImage[] = [{
    big: '/assets/img/cableado-help.png'
  }];

  fvFieldId: string;
  @ViewChild('inputSource') inputSourceCircuitComponent: InputSourceCircuitComponent;
  @ViewChild('outputSource') outputSourceCircuitComponent: InputSourceCircuitComponent;
  @ViewChild('helpImage') onlyPreviewGallery: NgxGalleryComponent;
  constructor(
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
    let inputSourceForm = this.inputSourceCircuitComponent.sourceForm;
    let outputSourceForm = this.outputSourceCircuitComponent.sourceForm;
    this._sourceFormBuilder.markFormGroupTouched(inputSourceForm);
    this._sourceFormBuilder.markFormGroupTouched(outputSourceForm);
    if ( !inputSourceForm.valid ) {
      this._snackBar.open("Se han enontrado algunos errores en el circuito fuente", "Aceptar", {
        duration: 3000,
      });
      return;
    } else if ( !outputSourceForm.valid ) {
      this._snackBar.open("Se han enontrado algunos errores en el circuito de salida", "Aceptar", {
        duration: 3000,
      });
      return;
    } else {
      this.mttp.cableado.input = this._sourceFormBuilder.extractData(inputSourceForm, this.mttp.cableado.input);
      this.mttp.cableado.output = this._sourceFormBuilder.extractData(outputSourceForm, this.mttp.cableado.output);
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
          let mttp: Mttp  = this._fvFieldService.get(this.fvFieldId).mttps.find(mttp => mttp._id === idMttp);
          this.mttp = mttp;
        }
      });
  }

}
