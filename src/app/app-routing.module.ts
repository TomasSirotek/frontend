import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'management',
    loadChildren: () => import('./modules/management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'ai',
    loadChildren: () => import('./modules/ai/ai.module').then((m) => m.AiModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
