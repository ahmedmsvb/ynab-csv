import { LocalStorageService } from './../shared/local-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  @Output() fileUploaded = new EventEmitter<File>();
  acceptableExtension: string = ".csv";
  noHeaderRow: boolean;

  onFileInput(event: any) {
    let file: File = event.target.files[0]

    if (file && file.size > 0) {
      this.fileUploaded.emit(file);
    }
  }

  dropped(files: NgxFileDropEntry[]) {
    (files[0].fileEntry as FileSystemFileEntry).file((file: File) => {
      if (this.hasValidExtension(file) && file.size > 0) {
        this.fileUploaded.emit(file);
      }
    })
  }

  hasValidExtension(file: File) {
    return file.name.toLowerCase().endsWith(this.acceptableExtension);
  }


  constructor(private localStorageService: LocalStorageService) {
    this.noHeaderRow = this.localStorageService.getNoHeaderOption();
  }

  setNoHeaderRow(value: boolean) {
    this.localStorageService.setNoHeaderOption(value);
  }

  ngOnInit(): void {
  }
}