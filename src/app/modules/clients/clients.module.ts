import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { SharedModule } from '../../shared/shared.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    ClientDetailComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    CoreModule,
    SharedModule,
    WidgetsModule,
  ]
})
export class ClientsModule { }
