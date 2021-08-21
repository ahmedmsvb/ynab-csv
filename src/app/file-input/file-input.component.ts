import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  @Output() fileUploaded = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  onFileInput(event: any) {
    let file: File = event.target.files[0]

    if (file && file.size > 0) {
      this.fileUploaded.emit(file);
    }
  }
}