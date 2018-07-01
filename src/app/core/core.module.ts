import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfvFormBuilder } from '@app/core/forms';
import { SfvService, FvFieldService } from '@app/core/services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SfvFormBuilder,
    SfvService,
    FvFieldService
    ]
})
export class CoreModule { }
