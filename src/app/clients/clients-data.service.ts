import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { SkipLoading } from '../shared/interceptors/loading.interceptor';
import { Client } from './models/client';
import { CreateClientDto } from './models/create-client-dto';
import { UpdateClientDto } from './models/update-client-dto';

@Injectable({
  providedIn: 'root',
})
export class ClientsDataService {
  private readonly httpClient = inject(HttpClient);
  private readonly API_URL_CLIENTS =
    'https://boasorte.teddybackoffice.com.br/users';

  getAllClients(
    { page, limit }: { page: number; limit: number } = {
      page: 1,
      limit: 2,
    }
  ): Observable<{
    clients: Client[];
    totalPages: number;
    currentPage: number;
  }> {
    return this.httpClient.get<{
      clients: Client[];
      totalPages: number;
      currentPage: number;
    }>(this.API_URL_CLIENTS, {
      params: new HttpParams().set('page', page).set('limit', limit),
    });
  }

  getAllClientsCount(): Observable<number> {
    return this.getAllClients({
      page: 1,
      limit: 1,
    }).pipe(map(({ totalPages }) => totalPages));
  }

  getClient(clientId: string | number): Observable<Client> {
    return this.httpClient.get<Client>(
      `${this.API_URL_CLIENTS}/${String(clientId)}`,
      {
        context: new HttpContext().set(SkipLoading, true),
      }
    );
  }

  createClient(createClientDto: CreateClientDto): Observable<Client> {
    return this.httpClient.post<Client>(this.API_URL_CLIENTS, createClientDto);
  }

  updateClient(
    clientId: string | number,
    updateClientDto: UpdateClientDto
  ): Observable<Client> {
    return this.httpClient.patch<Client>(
      `${this.API_URL_CLIENTS}/${String(clientId)}`,
      updateClientDto
    );
  }

  deleteClient(clientId: string | number) {
    return this.httpClient.delete(
      `${this.API_URL_CLIENTS}/${String(clientId)}`,
      { responseType: 'text' }
    );
  }
}
