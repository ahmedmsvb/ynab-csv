import { Component } from '@angular/core';

import * as Papa from 'papaparse';
import { LocalStorageService } from './shared/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YNAB CSV Converter';
  showFirstUpload = true;
  data: {}[] = [];
  columnHeaders: string[] = [];

  constructor(private localStorageService: LocalStorageService) {
    localStorageService.setupDefaultSettings();
  }

  onFileUploaded(file: File) {
    this.parseFile(file)
  }

  parseFile(file: File) {
    let noHeadersOption: boolean = this.localStorageService.getNoHeaderOption();

    Papa.parse<any>(file, {
      header: !noHeadersOption,
      skipEmptyLines: true,
      transformHeader: !noHeadersOption ? h => h : undefined,
      complete: (results) => {
        let data: {}[] = !noHeadersOption ? results.data : results.data.map(v => Object.assign({}, v))
        let headers = results.meta.fields ? results.meta.fields : this.generateHeaders(results.data[0].length)
        this.showPreview(data, headers);
      }
    })
  }

  generateHeaders(fieldCount: number): string[] {
    let results: string[] = [];
    for (let index = 0; index < fieldCount; index++) {
      results.push(index.toString());
    }

    return results;
  }

  showPreview(data: {}[], headers: any) {
    this.showFirstUpload = false;

    this.data = data;
    this.columnHeaders = headers;
  }

  getYnabColumnHeaders(): string[] {
    return this.localStorageService.getYnabColumnHeaders();
  }
}
