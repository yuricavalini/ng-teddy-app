import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ShellComponent } from './layout/shell/shell.component';
import { loggedInGuard } from './auth/guards/logged-in.guard';
import { authGuard } from './auth/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'entrar',
    component: LoginComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: '',
    component: ShellComponent,
    canMatch: [authGuard],
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clientes',
      },
      {
        path: '',
        loadChildren: () =>
          import('./clients/routes').then(m => m.CLIENTS_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'clientes' },
];
