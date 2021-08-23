import { LocalStorageService } from './../shared/local-storage.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['./data-mapping.component.css']
})
export class DataMappingComponent implements OnInit {
  @Input() data: {}[] = [];
  @Input() columnHeaders: string[] = [];
  @Input() ynabHeaders: string[] = [];

  mapping: any = {};

  mapYnabCol(ynabColumn: string, column: string) {
    if (column === '') {
      delete this.mapping[ynabColumn];
    } else {
      this.mapping[ynabColumn] = column;
    }
    this.localStorageService.setMapping(this.mapping);
  }

  getColumnName(ynabColumn: string): string {
    return this.mapping[ynabColumn];
  }

  constructor(private localStorageService: LocalStorageService) {  }

  ngOnInit(): void {
    setTimeout(()=> {
      this.mapping = this.localStorageService.getMapping()
    }, 0)
  }

}
