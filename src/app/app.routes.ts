import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';

export const APP_ROUTES: Routes = [
  {
    path: 'entrar',
    component: LoginComponent,
  },
];
