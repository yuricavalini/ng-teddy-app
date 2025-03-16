import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { BasePortalOutlet } from '@angular/cdk/portal';

export function defaultDialogConfig<T = unknown>(): DialogConfig<
  T,
  DialogRef<string, T>,
  BasePortalOutlet
> {
  const dialogConfig = new DialogConfig<
    T,
    DialogRef<string, T>,
    BasePortalOutlet
  >();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '400px';
  dialogConfig.height = 'auto';

  return dialogConfig;
}
