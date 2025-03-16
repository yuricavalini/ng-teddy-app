import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SvgIconComponent } from '../../shared/components/svg-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `<nav class="left-nav vertical-style">
    <header class="navbar-header">
      <div class="logo">
        <img
          src="/assets/images/logo.png"
          alt="Teddy logo"
          width="100"
          height="49" />
      </div>
      <div class="nav-buttons">
        <button (click)="toggle()" aria-label="Sidebar" type="button">
          <img
            src="/assets/icons/arrow-left.svg"
            alt="Adicionar cliente"
            width="16"
            height="16" />
        </button>
      </div>
    </header>

    <div
      class="navbar-scroll-container"
      aria-label="Sidebar Menu"
      role="navigation">
      <nav class="navbar-content">
        <ul class="navbar-menu">
          <li class="navbar-item">
            <a
              routerLink="/home"
              routerLinkActive="active-link"
              ariaCurrentWhenActive="page"
              class="navbar-link">
              <app-svg-icon iconClass="home" width="17" height="17" />
              <span>Home</span>
            </a>
          </li>
          <li class="navbar-item">
            <a
              routerLink="/clientes"
              routerLinkActive="active-link"
              ariaCurrentWhenActive="page"
              class="navbar-link">
              <app-svg-icon iconClass="clients" width="17" height="17" />
              <span>Clientes</span>
            </a>
          </li>
          <li class="navbar-item">
            <a
              routerLink="/produtos"
              routerLinkActive="active-link"
              ariaCurrentWhenActive="page"
              class="navbar-link">
              <app-svg-icon iconClass="products" width="17" height="17" />
              <span>Produtos</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </nav> `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 260px;
        min-width: 260px;
        max-width: 260px;
        z-index: 1000;
        background-color: #fff;
        border-top-right-radius: 16px;
        transform: translateX(-100%);
        -webkit-transition: transform 0.2s ease-in;
        -moz-transition: transform 0.2s ease-in;
        -o-transition: transform 0.2s ease-in;
        transition: transform 0.2s ease-in;
      }

      .left-nav {
        &.vertical-style {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          width: 100%;
          height: 100%;
        }

        .navbar-header {
          border-top-right-radius: 16px;
          background-color: #00000099;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 128px;

          .logo {
            width: 100px;
            height: 49px;
          }

          .nav-buttons {
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 1000;
            transform: translate(50%, 50%);

            button {
              display: flex;
              background-color: #1f1f1f;
              height: 42px;
              width: 42px;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              cursor: pointer;
              border: none;

              img {
                width: 20px;
                height: 20px;
              }
            }
          }
        }

        .navbar-scroll-container {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;

          .navbar-content {
            margin: 48px 0;

            .navbar-menu {
              display: flex;
              flex-direction: column;
              gap: 12px;
              margin-left: 24px;

              .navbar-item {
                .navbar-link {
                  width: 100%;
                  display: flex;
                  height: 44px;
                  justify-content: start;
                  align-items: center;
                  gap: 16px;
                  cursor: pointer;

                  color: #000;
                  text-decoration: underline transparent solid;
                  position: relative;

                  -webkit-transition:
                    color 0.2s ease-in,
                    text-decoration-color 0.2s ease-in;
                  -moz-transition:
                    color 0.2s ease-in,
                    text-decoration-color 0.2s ease-in;
                  -o-transition:
                    color 0.2s ease-in,
                    text-decoration-color 0.2s ease-in;
                  transition:
                    color 0.2s ease-in,
                    text-decoration-color 0.2s ease-in;

                  &::before {
                    content: '';
                    display: block;
                    background-color: #ec6724;
                    width: 2px;
                    height: 40px;
                    position: absolute;
                    right: 0;

                    opacity: 0;
                    visibility: hidden;
                    transition:
                      opacity 0.2s ease-in,
                      visibility 0.2s ease-in;
                  }

                  &:hover {
                    color: #ec6724;

                    &::before {
                      opacity: 1;
                      visibility: visible;
                    }
                  }

                  span {
                    font-weight: bold;
                  }
                }
              }
            }
          }
        }
      }

      .active-link {
        color: #ec6724 !important;

        &::before {
          opacity: 1 !important;
          visibility: visible !important;
        }
      }
    `,
  ],
  host: {
    role: 'navigation',
    '[class.open]': 'open',
  },
  imports: [FormsModule, RouterLink, RouterLinkActive, SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  open = false;

  toggle() {
    this.open = !this.open;
  }
}
