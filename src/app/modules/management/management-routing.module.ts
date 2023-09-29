import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxesComponent } from './pages/boxes/boxes.component';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
        { path: 'boxes', component: BoxesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }