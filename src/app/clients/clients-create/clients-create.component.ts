import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { SvgIconComponent } from '../../shared/components/svg-icon.component';
import { TrimWhiteSpaceDirective } from '../../shared/directives/trim-white-space.directive';
import { Client } from '../models/client';
import { createClientForm } from '../models/client-form';
import { ClientsDialogData } from '../models/clients-dialog-data';
import { CreateClientDto } from '../models/create-client-dto';

@Component({
  selector: 'app-clients-create',
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

    <form [formGroup]="form" class="clients-dialog--form">
      <div class="input-wrapper">
        <label for="name" hidden id="name">Digite o nome:</label>
        <input
          id="name"
          type="text"
          formControlName="name"
          placeholder="Digite o nome:"
          required
          appTrimWhiteSpace />
      </div>
      <div class="input-wrapper">
        <label for="salary" hidden id="salary">Digite o salário:</label>
        <input
          id="salary"
          type="text"
          formControlName="salary"
          placeholder="Digite o salário:"
          required
          mask="separator.2"
          prefix="R$"
          thousandSeparator="."
          decimalMarker="," />
      </div>
      <div class="input-wrapper">
        <label for="companyValuation" hidden id="companyValuation"
          >Digite o valor da empresa:</label
        >
        <input
          id="companyValuation"
          type="text"
          formControlName="companyValuation"
          placeholder="Digite o valor da empresa:"
          required
          mask="separator.2"
          prefix="R$"
          thousandSeparator="."
          decimalMarker=","
          [dropSpecialCharacters]="true" />
      </div>
    </form>
    <button (click)="onSave()" type="submit" class="clients-dialog--submit-btn">
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

      .clients-dialog--form {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        flex: 1 1 100%;

        .input-wrapper,
        .input-wrapper input {
          width: 100%;
        }

        .input-wrapper {
          border: 2px solid #d9d9d9;
          border-radius: 4px;
        }

        .input-wrapper input {
          height: 40px;
          width: 100%;
          padding: 0 14px;
          background-color: transparent;
          border: none;
          font-size: 16px;

          &::placeholder {
            color: #aaaaaa;
          }
        }
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
  imports: [
    ReactiveFormsModule,
    SvgIconComponent,
    NgxMaskDirective,
    TrimWhiteSpaceDirective,
  ],
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsCreateComponent implements OnInit {
  public readonly dialogRef = inject<DialogRef<Client | CreateClientDto>>(
    DialogRef<string>
  );
  private readonly data = inject<ClientsDialogData>(DIALOG_DATA);
  public readonly title =
    this.data.mode === 'edit' ? 'Editar cliente' : 'Criar cliente';
  public readonly submitBtnLabel = this.title;
  public readonly form = createClientForm();

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.form.patchValue(this.data.client);
    }
  }

  public onSave() {
    if (this.form.valid) {
      if (this.data.mode === 'edit') {
        const client: Client = {
          ...this.data.client,
          name: this.form.controls['name'].value!,
          salary: Number(this.form.controls['salary'].value!),
          companyValuation: Number(
            this.form.controls['companyValuation'].value!
          ),
        };
        this.dialogRef.close(client);
      } else {
        const client: CreateClientDto = {
          name: this.form.controls['name'].value!,
          salary: Number(this.form.controls['salary'].value!),
          companyValuation: Number(
            this.form.controls['companyValuation'].value!
          ),
        };
        this.dialogRef.close(client);
      }
    }
  }
}
