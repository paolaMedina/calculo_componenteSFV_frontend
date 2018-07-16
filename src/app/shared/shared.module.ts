import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequiredIfDirective } from './directives';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxGalleryModule } from 'ngx-gallery';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxGalleryModule,
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
    NgxGalleryModule,
    /** Directives */
    RequiredIfDirective
  ],
  declarations: [RequiredIfDirective]
})
export class SharedModule { }
