import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
  ],
})
export class SharedModule { }
