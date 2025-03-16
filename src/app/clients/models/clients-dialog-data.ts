import { Client } from './client';

export type ClientsDialogData =
  | { client: undefined; mode: 'create' }
  | { client: Client; mode: 'edit' };
