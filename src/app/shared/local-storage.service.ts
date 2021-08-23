import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  private KEY_YNAB_HEADERS = "YNAB_HEADERS"
  private KEY_NO_HEADERS_OPTION = "YNAB_NO_HEADER_OPTION"
  private KEY_MAPPING = "YNAP_MAPPING"

  ynabColsUseAmount = ["Date", "Payee", "Memo", "Amount"]
  ynabColsUseOutflowInflow = ["Date", "Payee", "Memo", "Outflow", "Inflow"]

  constructor() {
    this.localStorage = window.localStorage;
  }

  setupDefaultSettings() {
    if (this.get(this.KEY_NO_HEADERS_OPTION) === null) {
      this.setNoHeaderOption(false);
    }

    if (this.getYnabColumnHeaders() === null) {
      this.setYnabColumnHeaders(this.ynabColsUseAmount);
    }
  }

  private get(key: string): any {
    if (this.isLocalStorageSupported) {
      let item = this.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  private set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  private remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  getYnabColumnHeaders(): string[] {
    return this.get(this.KEY_YNAB_HEADERS);
  }

  setYnabColumnHeaders(value: string[]): boolean {
    return this.set(this.KEY_YNAB_HEADERS, value)
  }

  getNoHeaderOption(): boolean {
    return this.get(this.KEY_NO_HEADERS_OPTION);
  }

  setNoHeaderOption(value: boolean): boolean {
    return this.set(this.KEY_NO_HEADERS_OPTION, value);
  }

  getMapping(): Object {
    return this.get(this.KEY_MAPPING) != null ? this.get(this.KEY_MAPPING) : {};
  }

  setMapping(value: {}): boolean {
    return this.set(this.KEY_MAPPING, value);
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
