import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})

export class MappingService {
  
  exportToYnab(data: {}[], mapping: any) {
    let formatDates: boolean = this.localStorageService.getFormatDatesOption();
    let result: {}[] = [];

    data.forEach((element: any) => {
      let mappedRecord: any = {};
      for (const key in mapping) {
        let value = element[mapping[key]].trim();
        if (formatDates && this.isDate(value)) {
          value = new Date(Date.parse(value)).toLocaleDateString("en");
        }
        mappedRecord[key] = value;
      }
      result.push(mappedRecord);
    });

    let unparsed = Papa.unparse(result, { quotes: true });

    this.downloadFile(unparsed);
  }
  downloadFile(unparsed: string) {
    let csvData = new Blob([unparsed], { type: 'text/csv;charset=utf-8;' });
    let csvURL = window.URL.createObjectURL(csvData);
    let tmpLink = document.createElement('a');

    tmpLink.href = csvURL;
    tmpLink.setAttribute('download', 'YNAB_data_' + this.buildDateTimeForFileName() + '.csv');
    tmpLink.click();
  }

  buildDateTimeForFileName() {
    let dt = new Date();
    var mm = dt.getMonth() + 1;
    var dd = dt.getDate();
  
    return [dt.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('');
  }

  private isDate(value: string): boolean {
    let date = new Date(value);
    return date instanceof Date && !isNaN(date.valueOf());
  }

  getColumnName(mapping: any, ynabColumn: string): string {
    return mapping ? mapping[ynabColumn] : '';
  }

  mapYnabColumn(mapping: any, ynabColumn: string, column: string) {
    if (column === '') {
      delete mapping[ynabColumn];
    } else {
      mapping[ynabColumn] = column;
    }
    this.localStorageService.setMapping(mapping);
  }

  constructor(private localStorageService: LocalStorageService) { }
}
