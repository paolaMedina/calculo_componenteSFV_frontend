import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequiredIfDirective } from '@app/shared/directives';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RequiredIfDirective
  ],
  declarations: [RequiredIfDirective]
})
export class SharedModule { }
