import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SfvComponentsComponent } from './components/sfv-components/sfv-components.component';
import { FvFieldsConfigurationComponent } from './components/fv-fields-configuration/fv-fields-configuration.component';
import { FvFieldConfigurationComponent } from './components/fv-field-configuration/fv-field-configuration.component';
import { MpptsConfigurationComponent } from './components/mppts-configuration/mppts-configuration.component';
import { MpptCablingComponent } from './components/mppt-cabling/mppt-cabling.component';
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
    children: [
      {
        path: '',
        children: [
          {
            path: 'cabling/:mttp_id',
            component: MpptCablingComponent
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
