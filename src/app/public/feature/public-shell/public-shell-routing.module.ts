import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../../util/auth.guard';
// import { AdminLoginComponent } from './admin-login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../public-home/public-home.module').then(
        (m) => m.PublicHomeModule
      ),
  },
  {
    path: 'freelancer/:id',
    loadChildren: () =>
      import('../public-freelancer/public-freelancer.module').then(
        (m) => m.PublicFreelancerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicShellRoutingModule {}
