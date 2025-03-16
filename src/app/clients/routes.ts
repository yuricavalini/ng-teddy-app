import { Routes } from '@angular/router';

import { ClientsListComponent } from './clients-list/clients-list.component';

export const CLIENTS_ROUTES: Routes = [
  {
    path: 'clientes',
    component: ClientsListComponent,
    data: { listType: 'clients' },
  },
  {
    path: 'clientes-selecionados',
    component: ClientsListComponent,
    data: { listType: 'clients-selected' },
  },
];
