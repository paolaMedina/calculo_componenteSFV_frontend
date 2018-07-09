import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequiredIfDirective } from '@app/shared/directives';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    /** Vendor */
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    /** Directives */
    RequiredIfDirective
  ],
  declarations: [RequiredIfDirective]
})
export class SharedModule { }
