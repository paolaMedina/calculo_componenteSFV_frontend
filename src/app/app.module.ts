import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SfvComponentsComponent } from './components/sfv-components/sfv-components.component';
import { SharedModule } from './shared/shared.module';
import { FvFieldsConfigurationComponent } from './components/fv-fields-configuration/fv-fields-configuration.component';
import { CoreModule } from './core/core.module';
import { FvFieldConfigurationComponent } from './components/fv-field-configuration/fv-field-configuration.component';
import { CotizationBuilderComponent } from './pages/cotization-builder/cotization-builder.component';
import { MpptConfigurationComponent } from './components/mppt-configuration/mppt-configuration.component';
import { MpptsConfigurationComponent } from './components/mppts-configuration/mppts-configuration.component';
import { MpptCablingComponent } from './components/mppt-cabling/mppt-cabling.component';
import { OutputSourceCircuitComponent } from './components/mppt-cabling/output-source-circuit/output-source-circuit.component';
import { InputSourceCircuitComponent } from './components/mppt-cabling/input-source-circuit/input-source-circuit.component';
import { NominalArrayDataComponent } from './components/mppt-configuration/nominal-array-data/nominal-array-data.component';
import { InvestorOutputComponent } from './pages/investor-output/investor-output.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    InputSourceCircuitComponent,
    NominalArrayDataComponent,
    InvestorOutputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
