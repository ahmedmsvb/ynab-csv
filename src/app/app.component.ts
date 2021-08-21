import { Component } from '@angular/core';

import * as Papa from 'papaparse';

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

  onFileUploaded(file: File) {
    console.log("file received", file);
    this.parseFile(file)
  }

  parseFile(file: File) {
    let noHeaders = false
    let headerCounter = 0
  
    Papa.parse<{}>(file, {
      header:true,
      skipEmptyLines: true,
      transformHeader: (h) =>  noHeaders ? 'header'+headerCounter++ : h.trim() ,
      complete: (results) => {
        let data: {}[] = results.data
        let headers = results.meta.fields
        console.log("parsed:", results)
        this.showPreview(data, headers);
      }
    })
  }

  showPreview(data:{}[], headers:any){
    this.showFirstUpload=false;
    let ynabColsUseAmount = ["Date", "Payee", "Memo", "Amount"]
    let ynabColsUseOutflowInflow = ["Date", "Payee", "Memo", "Outflow", "Inflow"]

    this.data = data;
    this.columnHeaders = headers;
  }
}
