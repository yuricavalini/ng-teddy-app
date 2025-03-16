import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { APP_ROUTES } from './app.routes';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { LoadingService } from './shared/services/loading.service';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(LoadingService),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
};
