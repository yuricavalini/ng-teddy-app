import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../shared/services/localstorage.service';
import { Login } from './models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);

  isAuthenticated(): boolean {
    return Boolean(this.localStorageService.getUserToken());
  }

  login({ name }: Login) {
    this.localStorageService.setToken({ type: 'login', data: name });
    this.router.navigate(['/clientes']);
  }

  logout() {
    this.localStorageService.removeToken('login');
    this.router.navigate(['/entrar']);
  }
}
