import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SfvComponentsComponent } from './components/sfv-components/sfv-components.component';

const routes: Routes = [
  {
    path: '',
    component: SfvComponentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
