import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ShellComponent } from './layout/shell/shell.component';

export const APP_ROUTES: Routes = [
  {
    path: 'entrar',
    component: LoginComponent,
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./clients/routes').then(m => m.CLIENTS_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'clientes' },
];
