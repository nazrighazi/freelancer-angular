import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../util/auth.guard';
// import { AdminLoginComponent } from './admin-login.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../client-login/client-login.module').then(
        (m) => m.ClientLoginModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../client-dashboard/client-dashboard.module').then(
        (m) => m.ClientDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientShellRoutingModule {}
