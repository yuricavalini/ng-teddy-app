import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TrimWhiteSpaceDirective } from '../../shared/directives/trim-white-space.directive';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <h1>Olá, seja bem-vindo!</h1>
    <form [formGroup]="form" class="login-form">
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
    </form>
    <button (click)="login()" type="submit" class="login-btn">
      <strong>Entrar</strong>
    </button>
  `,
  styles: [
    `
      :host {
        max-width: 521px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        height: 100%;
        display: flex;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        gap: 20px;

        h1 {
          font-size: 36px;
          font-weight: 400;
        }
      }

      .login-form {
        display: flex;
        flex-direction: column;
        width: 100%;

        .input-wrapper,
        .input-wrapper input {
          width: 100%;
        }

        .input-wrapper {
          border: 2px solid #d9d9d9;
          border-radius: 4px;
        }

        .input-wrapper input {
          height: 60px;
          width: 100%;
          padding: 20px 16px;
          background-color: transparent;
          border: none;
          font-size: 24px;

          &::placeholder {
            color: #aaaaaa;
          }
        }
      }
      .login-btn {
        background-color: #ec6724;
        border: none;
        color: #fff;
        height: 60px;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        font-size: 24px;
        font-weight: 700;
      }
    `,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrimWhiteSpaceDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly form: FormGroup = this.createForm();

  private createForm() {
    const formControls = {
      name: ['', [Validators.required, Validators.maxLength(50)]],
    };
    return this.formBuilder.group(formControls);
  }

  public login() {
    this.authService.login(this.form.value);
  }
}
