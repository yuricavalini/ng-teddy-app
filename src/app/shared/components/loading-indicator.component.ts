import { CommonModule } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  template: `
    @if (customLoadingIndicator) {
      <ng-container *ngTemplateOutlet="customLoadingIndicator" />
    } @else {
      <span class="loader"></span>
    }
  `,
  styles: [
    `
      :host {
        position: fixed;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.32);
        z-index: 2000;
      }

      .loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-block;
        border-top: 4px solid #fff;
        border-right: 4px solid transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

      .loader::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border-left: 4px solid #ff3d00;
        border-bottom: 4px solid transparent;
        animation: rotation 0.5s linear infinite reverse;
      }
      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  imports: [CommonModule],
})
export class LoadingIndicatorComponent {
  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<unknown> | null = null;
}
