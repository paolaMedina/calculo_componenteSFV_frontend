import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


import { SfvFormBuilder } from './forms';
import { SfvService, FvFieldService, BaseDataService } from './services';
import { ApiService } from './services/api.service';
import { FvFormBuilder } from './forms/fv-field.form';
import { MttpFormBuilder } from './forms/mttp.form';
import { SourceFormBuilder } from './forms/source.form';


import { APP_BASE_HREF, PlatformLocation } from "@angular/common";

/**
 * This function is used internal to get a string instance of the `<base href="" />` value from `index.html`.
 * This is an exported function, instead of a private function or inline lambda, to prevent this error:
 *
 * `Error encountered resolving symbol values statically.`
 * `Function calls are not supported.`
 * `Consider replacing the function or lambda with a reference to an exported function.`
 *
 * @param platformLocation an Angular service used to interact with a browser's URL
 * @return a string instance of the `<base href="" />` value from `index.html`
 */
export function getBaseHref(platformLocation: PlatformLocation): string {
  console.log(platformLocation.getBaseHrefFromDOM(), 'base href from doom');
    return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
  },
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
