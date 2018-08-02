import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


import { SfvFormBuilder } from './forms';
import { SfvService, FvFieldService, BaseDataService } from './services';
import { ApiService } from './services/api.service';
import { FvFormBuilder } from './forms/fv-field.form';
import { MttpFormBuilder } from './forms/mttp.form';
import { SourceFormBuilder } from './forms/source.form';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    /** Vendors */
    HttpClient,
    /* Forms services */
    SfvFormBuilder,
    SourceFormBuilder,
    FvFormBuilder,
    SfvService,
    FvFieldService,
    MttpFormBuilder,
    /* Shared services */
    ApiService,
    /* Base data services */
    BaseDataService
    ]
})
export class CoreModule { }
