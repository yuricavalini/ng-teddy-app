import { Injectable } from '@angular/core';

export type LocalStorageTokenType =
  | { type: 'login'; data: string }
  | { type: 'clients-selected'; data: string[] };

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_TOKEN = 'userTeddyToken';
  private readonly CLIENTS_SELECTED_TOKEN = 'clientsSelectedTeddyToken';

  setToken({ type, data }: LocalStorageTokenType) {
    if (type === 'login') {
      localStorage.setItem(this.USER_TOKEN, data);
    } else {
      const clientsIds = this.getClientsSelectedIds();
      const clientsIdsUpdated = [...new Set([...clientsIds, ...data])];
      localStorage.setItem(
        this.CLIENTS_SELECTED_TOKEN,
        JSON.stringify(clientsIdsUpdated)
      );
    }
  }

  removeToken(type: LocalStorageTokenType['type']) {
    if (type === 'login') {
      localStorage.removeItem(this.USER_TOKEN);
    } else {
      localStorage.removeItem(this.CLIENTS_SELECTED_TOKEN);
    }
  }

  getUserToken() {
    const token = localStorage.getItem(this.USER_TOKEN);
    return token;
  }

  getClientsSelectedIds(): string[] {
    const token = localStorage.getItem(this.CLIENTS_SELECTED_TOKEN);

    if (token === null) {
      return [];
    }

    const parsedToken: string[] = JSON.parse(token);

    return parsedToken;
  }

  removeSingleClientSelected(clientId: string) {
    const clientsIds = this.getClientsSelectedIds();

    const clientsIdsUpdated = clientsIds.filter(client => client !== clientId);

    localStorage.setItem(
      this.CLIENTS_SELECTED_TOKEN,
      JSON.stringify(clientsIdsUpdated)
    );
  }
}
