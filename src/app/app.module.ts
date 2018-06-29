import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SfvComponentsComponent } from './components/sfv-components/sfv-components.component';
import { SharedModule } from './shared/shared.module';
import { FvFieldsConfigurationComponent } from '@app/components/fv-fields-configuration/fv-fields-configuration.component';
import { CoreModule } from '@app/core/core.module';
import { FvFieldConfigurationComponent } from './components/fv-field-configuration/fv-field-configuration.component';
import { CotizationBuilderComponent } from './pages/cotization-builder/cotization-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    SfvComponentsComponent,
    FvFieldsConfigurationComponent,
    FvFieldConfigurationComponent,
    CotizationBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
