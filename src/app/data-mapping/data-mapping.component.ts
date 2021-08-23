import { LocalStorageService } from './../shared/local-storage.service';
import { MappingService } from './../shared/mapping.service';
import { Component, Input, OnInit } from '@angular/core';

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

  getColumnName(ynabColumn: string): string {
    return this.mappingService.getColumnName(this.mapping, ynabColumn);
  }

  onYnabColMapped(ynabColumn: string, column: string) {
    this.mappingService.mapYnabColumn(this.mapping, ynabColumn, column);
  }

  exportToYnab(){
    this.mappingService.exportToYnab(this.data,this.mapping)
  }

  constructor(private mappingService: MappingService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.mapping = this.localStorageService.getMapping()
    }, 0);
  }

}
