import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { SvgIconComponent } from '../../shared/components/svg-icon.component';
import { Client } from '../models/client';

@Component({
  selector: 'app-clients-card',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `<article class="clients-card">
    <div class="clients-card--content">
      <p class="clients-card--content__name">{{ client.name }}</p>
      <p>
        Salário:
        {{ client.salary | currency: 'BRL' : 'symbol-narrow' : '1.2-2' }}
      </p>
      <p>
        Empresa:
        {{
          client.companyValuation | currency: 'BRL' : 'symbol-narrow' : '1.2-2'
        }}
      </p>
    </div>

    @if (listType === 'clients') {
      <div class="clients-card--actions">
        <button
          class="clients-card--actions__btn"
          (click)="onClientsCardAction('select')">
          <app-svg-icon iconClass="plus" />
        </button>
        <button
          class="clients-card--actions__btn"
          (click)="onClientsCardAction('edit')">
          <app-svg-icon iconClass="pencil" />
        </button>
        <button
          class="clients-card--actions__btn"
          (click)="onClientsCardAction('delete')">
          <app-svg-icon iconClass="trash" backgroundColor="#FF0000" />
        </button>
      </div>
    } @else {
      <div class="clients-card--actions" [style.justify-content]="'flex-end'">
        <button
          class="clients-card--actions__btn"
          (click)="onClientsCardAction('unselect')">
          <app-svg-icon iconClass="minus" backgroundColor="#FF0000" />
        </button>
      </div>
    }
  </article>`,
  styles: [
    `
      :host {
        display: flex;
        height: 138px;
        max-height: 138px;
        padding: 15px 16px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        flex: 1 1 285px;
      }

      .clients-card {
        flex: 1 1 100%;

        .clients-card--content {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          justify-content: center;

          p {
            margin: 0;
            padding: 0;
            font-size: 14px;
            font-weight: normal;
          }

          .clients-card--content__name {
            font-size: 16px;
            font-weight: bold;
          }
        }
        .clients-card--actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;

          .clients-card--actions__btn {
            height: 20px;
            width: 20px;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsCardComponent {
  @Input({ required: true }) client!: Client;
  @Input({ required: true }) listType!: 'clients' | 'clients-selected';

  @Output()
  clientSelected = new EventEmitter<Client>();

  @Output()
  clientUnselected = new EventEmitter<Client>();

  @Output()
  clientEdited = new EventEmitter<Client>();

  @Output()
  clientDeleted = new EventEmitter<Client>();

  onClientsCardAction(action: 'select' | 'unselect' | 'edit' | 'delete') {
    switch (action) {
      case 'select':
        this.clientSelected.emit(this.client);
        break;
      case 'unselect':
        this.clientUnselected.emit(this.client);
        break;
      case 'edit':
        this.clientEdited.emit(this.client);
        break;
      case 'delete':
        this.clientDeleted.emit(this.client);
        break;
      default: {
        const _exhaustiveCheck: never = action;
        throw new Error(`Ação inesperada: ${_exhaustiveCheck}`);
      }
    }
  }
}
