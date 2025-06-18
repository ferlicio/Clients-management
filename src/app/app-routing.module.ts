import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "clients",
    loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "clients",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
