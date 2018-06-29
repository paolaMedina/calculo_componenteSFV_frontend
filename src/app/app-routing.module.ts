import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SfvComponentsComponent } from '@app/components/sfv-components/sfv-components.component';
import { FvFieldsConfigurationComponent } from '@app/components/fv-fields-configuration/fv-fields-configuration.component';
import { FvFieldConfigurationComponent } from '@app/components/fv-field-configuration/fv-field-configuration.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
