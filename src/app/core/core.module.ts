import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfvFormBuilder } from './forms';
import { SfvService, FvFieldService } from './services/';

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
