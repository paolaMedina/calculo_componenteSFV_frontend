import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SfvComponentsComponent } from './components/sfv-components/sfv-components.component';
import { FvFieldsConfigurationComponent } from './components/fv-fields-configuration/fv-fields-configuration.component';
import { FvFieldConfigurationComponent } from './components/fv-field-configuration/fv-field-configuration.component';
import { MpptsConfigurationComponent } from './components/mppts-configuration/mppts-configuration.component';
import { MpptCablingComponent } from './components/mppt-cabling/mppt-cabling.component';
import { InvestorOutputComponent } from './pages/investor-output/investor-output.component';
const routes: Routes = [
  {
    path: '',
    component: SfvComponentsComponent
  },
  {
    path: 'fv-fields-config',
    component: FvFieldsConfigurationComponent
  },
  {
    path: 'fv-field-config/:id',
    component: FvFieldConfigurationComponent
  },
  {
    path: 'mppts-config/:fv_id',
    component: MpptsConfigurationComponent,
  },
  {
    path: 'mppt-config/cabling',
    component: MpptCablingComponent
  },
  {
    path: 'fv-field-config/investor-output/:fv_id',
    component: InvestorOutputComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
