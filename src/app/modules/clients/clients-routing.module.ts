import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../core/layout/layout.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ClientListComponent } from './pages/client-list/client-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ClientListComponent
      },
      {
        path: ':id',
        component: ClientDetailComponent,
        children: [
          {
            path: 'edit',
            component: ClientDetailComponent
          }
        ]
      },
      {
        path: 'new',
        component: ClientDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
