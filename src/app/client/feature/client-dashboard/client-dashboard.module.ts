import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { ClientDashboardComponent } from './client-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DigitOnlyDirective } from '../../util/numbers-only.directive';
@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [CommonModule, ClientDashboardRoutingModule, DigitOnlyDirective],
  exports: [MatDialogModule],
})
export class ClientDashboardModule {}
