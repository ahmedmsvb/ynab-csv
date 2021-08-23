import { LocalStorageService } from './../shared/local-storage.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() data: {}[] = [];
  @Input() columnHeaders: string[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  getYnabColumnHeaders(): string[] {
    return this.localStorageService.getYnabColumnHeaders();
  }

  mapYnabCol(newMapping: {}) {
    this.localStorageService.setMapping(newMapping);
  }
}
