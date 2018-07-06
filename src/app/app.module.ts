import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { SfvComponentsComponent } from '@app/components/sfv-components/sfv-components.component';
import { SharedModule } from '@app/shared/shared.module';
import { FvFieldsConfigurationComponent } from '@app/components/fv-fields-configuration/fv-fields-configuration.component';
import { CoreModule } from '@app/core/core.module';
import { FvFieldConfigurationComponent } from '@app/components/fv-field-configuration/fv-field-configuration.component';
import { CotizationBuilderComponent } from '@app/pages/cotization-builder/cotization-builder.component';
import { MpptConfigurationComponent } from './components/mppt-configuration/mppt-configuration.component';
import { MpptsConfigurationComponent } from './components/mppts-configuration/mppts-configuration.component';
import { MpptCablingComponent } from './components/mppt-cabling/mppt-cabling.component';
import { OutputSourceCircuitComponent } from './components/mppt-cabling/output-source-circuit/output-source-circuit.component';
import { InputSourceCircuitComponent } from './components/mppt-cabling/input-source-circuit/input-source-circuit.component';

@NgModule({
  declarations: [
    AppComponent,
    SfvComponentsComponent,
    FvFieldsConfigurationComponent,
    FvFieldConfigurationComponent,
    CotizationBuilderComponent,
    MpptConfigurationComponent,
    MpptsConfigurationComponent,
    MpptCablingComponent,
    OutputSourceCircuitComponent,
    InputSourceCircuitComponent
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
