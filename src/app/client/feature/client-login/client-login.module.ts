import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientLoginRoutingModule } from './client-login-routing.module';
import { ClientLoginComponent } from './client-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientLoginComponent],
  imports: [CommonModule, ReactiveFormsModule, ClientLoginRoutingModule],
})
export class ClientLoginModule {}
