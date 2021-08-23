import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.css']
})
export class DataPreviewComponent implements OnInit {
  @Input() data: {}[] = [];
  @Input() columnHeaders: string[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
