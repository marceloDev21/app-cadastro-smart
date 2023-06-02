import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonModule,
    InputMaskModule,
    FormsModule,
    CardModule,
    TriStateCheckboxModule,
    InputTextModule,
    RadioButtonModule,
    ToastModule,
    DialogModule,
  ],
})
export class LoginModule {}
