import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./client/feature/client-shell/client-shell.module').then(
        (m) => m.ClientShellModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./public/feature/public-shell/public-shell.module').then(
        (m) => m.PublicShellModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
