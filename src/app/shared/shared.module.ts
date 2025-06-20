import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    DialogComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
})
export class SharedModule { }
