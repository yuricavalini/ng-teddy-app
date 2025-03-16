import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { SvgIconComponent } from '../../shared/components/svg-icon.component';
import { LocalStorageService } from '../../shared/services/localstorage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SvgIconComponent],
  template: ` <header>
    <div class="navbar-toggle-container">
      <button class="navbar-toggle__btn" aria-label="Menu" type="button">
        <app-svg-icon iconClass="menu" width="24" />
      </button>
    </div>

    <nav class="nav-container center-page-content">
      <div class="logo">
        <img
          src="/assets/images/logo.png"
          alt="Teddy logo"
          width="100"
          height="49" />
      </div>

      <nav class="navbar" aria-label="Main Menu" role="navigation">
        <ul class="navbar-menu">
          <li class="navbar-item">
            <a
              routerLink="/clientes"
              routerLinkActive="active-link"
              ariaCurrentWhenActive="page"
              class="navbar-link"
              >Clientes</a
            >
          </li>
          <li class="navbar-item">
            <a
              routerLink="/clientes-selecionados"
              routerLinkActive="active-link"
              ariaCurrentWhenActive="page"
              class="navbar-link"
              >Clientes selecionados</a
            >
          </li>
          <li class="navbar-item">
            <a
              (click)="onLogoutButtonClicked()"
              (keydown.enter)="onLogoutButtonClicked()"
              routerLinkActive="active-link"
              ariaCurrentWhenActive="page"
              class="navbar-link"
              role="button"
              tabindex="0"
              >Sair</a
            >
          </li>
        </ul>
      </nav>

      <div>
        <span>Olá, </span><strong>{{ username }}!</strong>
      </div>
    </nav>
  </header>`,
  styles: [
    `
      :host {
        display: block;
        background: #fff;
        width: 100%;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
      }

      header {
        max-height: 100px;
        height: 100px;
        display: flex;
        align-items: center;

        .navbar-toggle-container {
          margin: 0 46px 0 50px;

          .navbar-toggle__btn {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background: transparent;
            width: 24px;
            height: 20px;

            i {
              width: 24px;
            }
          }
        }
      }

      .nav-container {
        max-height: 50px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex: 1 1 100%;
        align-items: center;
        padding-left: 0;

        .navbar,
        .navbar * {
          height: inherit;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 330px;

          .navbar-item {
            .navbar-link {
              width: 100%;
              display: flex;
              justify-content: start;
              align-items: center;
              gap: 16px;
              cursor: pointer;

              color: #000;
              text-decoration: underline transparent solid;
              -webkit-transition:
                color 0.2s ease-in,
                text-decoration 0.2s ease-in;
              -moz-transition:
                color 0.2s ease-in,
                text-decoration 0.2s ease-in;
              -o-transition:
                color 0.2s ease-in,
                text-decoration 0.2s ease-in;
              transition:
                color 0.2s ease-in,
                text-decoration 0.2s ease-in;

              &:hover {
                color: #ec6724;
                text-decoration: underline;
              }
            }
          }
        }
      }

      .active-link {
        color: #ec6724 !important;
        text-decoration: underline !important;
      }
    `,
  ],
})
export class HeaderComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly authService = inject(AuthService);
  public username = this.localStorageService.getUserToken() ?? 'Usuário';

  onLogoutButtonClicked(): void {
    this.authService.logout();
  }
}
