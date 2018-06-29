import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SfvComponentsComponent } from './components/sfv-components/sfv-components.component';
import { SharedModule } from './shared/shared.module';
import { FvFieldsConfigurationComponent } from './fv-fields-configuration/fv-fields-configuration.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    SfvComponentsComponent,
    FvFieldsConfigurationComponent
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
