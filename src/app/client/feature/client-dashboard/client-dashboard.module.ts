import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { ClientDashboardComponent } from './client-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [CommonModule, ClientDashboardRoutingModule],
  exports: [MatDialogModule],
})
export class ClientDashboardModule {}
