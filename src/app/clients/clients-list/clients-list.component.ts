import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import {
  combineLatest,
  concatMap,
  finalize,
  from,
  map,
  mergeMap,
  Observable,
  of,
  startWith,
  tap,
  toArray,
} from 'rxjs';

import { SvgIconComponent } from '../../shared/components/svg-icon.component';
import { defaultDialogConfig } from '../../shared/config/default-dialog-config';
import { LoadingService } from '../../shared/services/loading.service';
import { LocalStorageService } from '../../shared/services/localstorage.service';
import { ClientsCreateComponent } from '../clients-create/clients-create.component';
import { ClientsDataService } from '../clients-data.service';
import { ClientsDeleteComponent } from '../clients-delete/clients-delete.component';
import { ClientsCardComponent } from '../components/clients-card.component';
import { Client } from '../models/client';
import { CreateClientDto } from '../models/create-client-dto';
import { UpdateClientDto } from '../models/update-client-dto';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-clients-list',
  standalone: true,
  template: `
    @let listModel = listModel$ | async;
    @let totalClientsCount =
      listType === 'clients' ? (totalClientsCount$ | async) || 0 : 0;

    <header class="actions">
      @if (listType === 'clients') {
        <div>
          <p>
            <strong>{{ totalClientsCount || 0 }}</strong> clientes encontrados:
          </p>
        </div>

        <div class="actions-pagination">
          <span class="pagination-label">Clientes por páginas:</span>

          <div class="pagination-select-wrapper">
            <select class="pagination-select" [formControl]="pageSizeControl">
              @for (option of pageSizeOptions; track option) {
                <option [value]="option">
                  {{ option }}
                </option>
              }
            </select>
            <app-svg-icon iconClass="chevron-down" width="15" height="15" />
          </div>
        </div>
      } @else {
        <div>
          <p><strong>Clientes selecionados:</strong></p>
        </div>
      }
    </header>

    <section class="clients-list">
      @if (listModel?.clients?.length === 0) {
        <div class="no-clients">
          <h1>Nenhum cliente selecionado</h1>
        </div>
      } @else {
        @for (
          client of listModel?.clients || []
            | paginate
              : {
                  itemsPerPage: pageSizeControl.value,
                  currentPage: currentPageControl.value,
                  totalItems: totalClientsCount,
                };
          track client.id
        ) {
          <app-clients-card
            [client]="client"
            [listType]="listType"
            (clientSelected)="onSelectClient($event)"
            (clientUnselected)="onUnselectClient($event)"
            (clientEdited)="onEditClient($event)"
            (clientDeleted)="onDeleteClient($event)" />
        }
      }
    </section>

    @if (listType === 'clients') {
      <button class="action-button" (click)="openCreateClienteDialog()">
        Criar cliente
      </button>

      <div class="pagination-controls-container">
        <pagination-controls
          (pageChange)="currentPageControl.setValue($event)"
          (pageBoundsCorrection)="currentPageControl.setValue($event)"
          [maxSize]="7"
          [directionLinks]="false"
          [autoHide]="true"
          [responsive]="true"
          previousLabel="Previous"
          nextLabel="Next"
          screenReaderPaginationLabel="Pagination"
          screenReaderPageLabel="page"
          screenReaderCurrentLabel="You're on page"
          class="pagination-controls-component">
        </pagination-controls>
      </div>
    } @else {
      @if (listModel?.clients?.length) {
        <button
          class="action-button"
          (click)="clearSelectedClients()"
          [disabled]="!listModel?.clients?.length"
          [class.action-button--disabled]="!listModel?.clients?.length">
          Limpar clientes selecionados
        </button>
      }
    }
  `,
  styles: [
    `
      :host {
        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          height: 25px;
          margin-bottom: 8px;

          .actions-pagination {
            display: flex;
            align-items: center;

            .pagination-label {
              margin-right: 9px;
            }

            .pagination-select-wrapper {
              position: relative;

              .pagination-select {
                appearance: none;
                font-size: 12px;
                min-width: 50px;
                max-width: 50px;
                height: 25px;
                padding: 4px 7px;
                margin: 0;
                width: 100%;
                color: #000;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                z-index: 1;
                position: initial;
              }

              app-svg-icon {
                position: absolute;
                width: 15px;
                height: 15px;
                right: 8px;
                content: '';
                display: flex;

                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }

      .clients-list {
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(285px, 1fr));
        margin-bottom: 20px;

        .no-clients {
          height: 40vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .action-button {
        height: 40px;
        width: 100%;
        color: #ec6724;
        border: 2px solid #ec6724;
        background-color: transparent;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        -webkit-transition:
          color 0.2s ease-in,
          background-color 0.2s ease-in;
        -moz-transition:
          color 0.2s ease-in,
          background-color 0.2s ease-in;
        -o-transition:
          color 0.2s ease-in,
          background-color 0.2s ease-in;
        transition:
          color 0.2s ease-in,
          background-color 0.2s ease-in;

        &:hover {
          background-color: #ec6724;
          color: #fff;
        }
      }

      .action-button--disabled,
      .action-button--disabled:hover {
        background-color: transparent;
        color: #aaaaaa;
        border: 2px solid #aaaaaa;
        cursor: not-allowed;
      }

      .pagination-controls-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .pagination-controls-component ::ng-deep .ngx-pagination a,
        .pagination-controls-component ::ng-deep .ngx-pagination .current {
          padding: 9px 14px;
          height: 35px;
          width: 35px;
          border-radius: 4px;
        }

        .pagination-controls-component ::ng-deep .ngx-pagination a,
        .pagination-controls-component ::ng-deep .ngx-pagination .current span {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-controls-component ::ng-deep .ngx-pagination .current {
          background-color: #ec6724;
        }
      }

      .client-card {
        flex-direction: column;
        margin-bottom: 0 !important;

        p {
          margin: 0;
          padding: 0;
        }
      }
    `,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    AsyncPipe,
    ClientsCardComponent,
    SvgIconComponent,
    NgxPaginationModule,
  ],
})
export class ClientsListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);
  private readonly clientsDataService = inject(ClientsDataService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly toastrService = inject(ToastrService);
  private readonly dialogConfig = defaultDialogConfig();
  private readonly loadingService = inject(LoadingService);

  public listType!: 'clients' | 'clients-selected';
  public clients$: Client[] = [];
  public listModel$!: Observable<{
    clients: Client[];
    totalPages: number;
    currentPage: number;
  }>;
  public readonly pageSizeOptions = [8, 16, 24, 32];
  public pageSizeControl = new FormControl(this.pageSizeOptions[1], {
    nonNullable: true,
  });
  public currentPageControl = new FormControl(1, {
    nonNullable: true,
  });
  public totalClientsCount$: Observable<number> =
    this.clientsDataService.getAllClientsCount();

  ngOnInit(): void {
    this.loadListModel();
  }

  private getClientsList() {
    return combineLatest([
      this.currentPageControl.valueChanges.pipe(
        startWith(this.currentPageControl.value)
      ),
      this.pageSizeControl.valueChanges.pipe(
        startWith(this.pageSizeControl.value)
      ),
    ]).pipe(
      concatMap(([currentPage, pageSize]) => {
        return combineLatest([
          this.clientsDataService.getAllClients({
            page: currentPage,
            limit: pageSize,
          }),
          this.clientsDataService.getAllClientsCount(),
        ]);
      }),
      tap(([, totalClientsCount]) => {
        this.totalClientsCount$ = of(totalClientsCount);
      }),
      map(([clientsList]) => clientsList)
    );
  }

  private getClientsSelectedList() {
    return of(this.localStorageService.getClientsSelectedIds()).pipe(
      tap(() => this.loadingService.loadingOn()),
      concatMap(ids =>
        from(ids).pipe(
          mergeMap(id => this.clientsDataService.getClient(id), 10),
          toArray(),
          map(clientsWithId => {
            const sortedClients = clientsWithId
              .sort(
                (a, b) => ids.indexOf(String(a.id)) - ids.indexOf(String(b.id))
              )
              .map(item => item);
            return sortedClients;
          })
        )
      ),
      map(clients => ({
        clients,
        totalPages: 1,
        currentPage: 1,
      })),
      finalize(() => this.loadingService.loadingOff())
    );
  }

  private loadListModel() {
    const allClientsList$ = this.getClientsList();
    const allClientsSelectedList$ = this.getClientsSelectedList();

    this.listModel$ = this.route.data.pipe(
      startWith(this.route.snapshot.data),
      tap(data => {
        this.listType = data['listType'] ?? 'clients';
      }),
      concatMap(() =>
        this.listType === 'clients' ? allClientsList$ : allClientsSelectedList$
      )
    );
  }

  reloadClientsListCurrentPage() {
    this.currentPageControl.setValue(this.currentPageControl.value);
  }

  openCreateClienteDialog(): void {
    this.dialogConfig.data = {
      mode: 'create',
    };

    const dialogRef = this.dialog.open<string>(
      ClientsCreateComponent,
      this.dialogConfig
    );

    dialogRef.closed.subscribe(result => {
      if (!result) return;

      const createClientDto = result as unknown as CreateClientDto;

      this.clientsDataService.createClient(createClientDto).subscribe({
        next: () => {
          this.reloadClientsListCurrentPage();
          this.toastrService.success('Cliente adicionado.', 'Sucesso!');
        },
        error: () => {
          this.toastrService.error(
            'Algo inesperado aconteceu. Cliente não adicionado.',
            'Ops!'
          );
        },
      });
    });
  }

  private openEditClientDialog(client: Client): void {
    this.dialogConfig.data = {
      mode: 'edit',
      client,
    };

    const dialogRef = this.dialog.open<string>(
      ClientsCreateComponent,
      this.dialogConfig
    );

    dialogRef.closed.subscribe(result => {
      if (!result) return;

      const updateClient = result as unknown as Client;

      const updateClientDto: UpdateClientDto = {
        name: updateClient.name,
        salary: updateClient.salary,
        companyValuation: updateClient.companyValuation,
      };

      this.clientsDataService
        .updateClient(client.id, updateClientDto)
        .subscribe({
          next: () => {
            this.reloadClientsListCurrentPage();
            this.toastrService.success('Cliente atualizado.', 'Sucesso!');
          },
          error: () => {
            this.toastrService.error(
              'Algo inesperado aconteceu. Cliente não atualizado.',
              'Ops!'
            );
          },
        });
    });
  }

  private openDeleteClientDialog(client: Client): void {
    this.dialogConfig.data = client;

    const dialogRef = this.dialog.open<string>(
      ClientsDeleteComponent,
      this.dialogConfig
    );

    dialogRef.closed.subscribe(result => {
      if (!result) return;

      this.clientsDataService.deleteClient(client.id).subscribe({
        next: () => {
          this.reloadClientsListCurrentPage();
          this.toastrService.success('Cliente deletado.', 'Sucesso!');
        },
        error: () => {
          this.toastrService.error(
            'Algo inesperado aconteceu. Cliente não deletado.',
            'Ops!'
          );
        },
      });
    });
  }

  onEditClient(client: Client) {
    this.openEditClientDialog(client);
  }

  onDeleteClient(client: Client) {
    this.openDeleteClientDialog(client);
  }

  onSelectClient(client: Client) {
    const clientsSelected = this.localStorageService.getClientsSelectedIds();
    const isClientSelected = clientsSelected.find(
      c => parseInt(c) === client.id
    );

    if (!isClientSelected) {
      this.localStorageService.setToken({
        type: 'clients-selected',
        data: [client.id.toString()],
      });
      this.toastrService.success('Cliente selecionado.', 'Sucesso!');
    } else {
      this.toastrService.info('Cliente já selecionado.', 'Informação');
    }
  }

  onUnselectClient(client: Client) {
    this.listModel$ = this.listModel$.pipe(
      map(data => {
        const filteredClients = data.clients.filter(c => c.id !== client.id);
        return {
          clients: filteredClients ? filteredClients : [],
          totalPages: 1,
          currentPage: 1,
        };
      })
    );
    this.localStorageService.removeSingleClientSelected(client.id.toString());
    this.toastrService.success('Cliente removido.', 'Sucesso!');
  }

  clearSelectedClients() {
    if (this.listType === 'clients-selected') {
      this.localStorageService.removeToken(this.listType);
      this.listModel$ = of({
        clients: [],
        totalPages: 0,
        currentPage: 0,
      });

      this.toastrService.success(
        'Todos os clientes foram removidos.',
        'Sucesso!'
      );
    }
  }
}
