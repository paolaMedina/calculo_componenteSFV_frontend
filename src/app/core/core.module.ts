import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfvFormBuilder } from '@app/core/forms';
import { SfvService, FvFieldService, BaseDataService } from '@app/core/services';
import { ApiService } from '@app/core/services/api.service';
import { HttpClient } from '@angular/common/http';

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
    SfvService,
    FvFieldService,
    /* Shared services */
    ApiService,
    /* Base data services */
    BaseDataService
    ]
})
export class CoreModule { }
