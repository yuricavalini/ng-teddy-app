import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SvgIconComponent } from '../../shared/components/svg-icon.component';
import { Client } from '../models/client';

@Component({
  selector: 'app-clients-delete',
  standalone: true,
  template: `
    <div class="clients-dialog--header">
      <span>{{ title }}:</span>
      <button class="close-btn" (click)="dialogRef.close()">
        <app-svg-icon
          iconClass="close"
          width="12"
          height="12"
          [applyTransition]="false" />
      </button>
    </div>

    <p>
      Você está prestes a excluir o cliente: <strong>{{ data.name }}</strong>
    </p>

    <button
      (click)="onDelete()"
      type="button"
      class="clients-dialog--submit-btn">
      <strong>{{ submitBtnLabel }}</strong>
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
        max-width: 400px;
        min-width: 300px;
        width: 100%;
        font-family: 'Inter', Arial, sans-serif;
        animation: fadeInDownToTop 0.2s ease-out;
      }

      @keyframes fadeInDownToTop {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .clients-dialog--header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        span {
          font-size: 16px;
          font-weight: bold;
        }

        button {
          height: 12px;
          width: 12px;
          cursor: pointer;
        }
      }

      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
      }

      .clients-dialog--submit-btn {
        background-color: #ec6724;
        border: none;
        color: #fff;
        height: 40px;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        margin-top: 15px;
      }
    `,
  ],
  imports: [ReactiveFormsModule, SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsDeleteComponent {
  public readonly dialogRef = inject<DialogRef<Client>>(DialogRef<string>);
  public readonly data = inject<Client>(DIALOG_DATA);
  public readonly title = 'Excluir cliente';
  public readonly submitBtnLabel = this.title;

  public onDelete() {
    this.dialogRef.close(this.data);
  }
}
