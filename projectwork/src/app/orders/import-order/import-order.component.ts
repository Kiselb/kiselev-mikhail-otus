import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpResponse } from  '@angular/common/http';
import { UploadFileService } from '../upload-file.service'

@Component({
  selector: 'app-import-order',
  templateUrl: './import-order.component.html',
  styleUrls: ['./import-order.component.css']
})
export class ImportOrderComponent implements OnInit {
  
  @ViewChild('selectfilesinput', { static: true })
  filesInput: ElementRef;

  selectFile = new FormGroup({
    ctrlFileName: new FormControl(),
  });
  formDataSendFile: FormData = null;
  selectedFileName: string = "";

  constructor(private uploadFileService: UploadFileService) { }

  openFileDialog() {
    this.filesInput.nativeElement.click();
  }
  onChangeFile(event) {
    if (event.target.files.length > 0) {
      this.formDataSendFile = new FormData();
      console.log("Path: " + event.target.files[0].webkitRelativePath);
      this.formDataSendFile.append('file', event.target.files[0]);
    }
  }
  uploadFile() {
    if (this.formDataSendFile) {
      this.uploadFileService.upload(this.formDataSendFile)
        .subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('File uploaded');
          } else {
            console.dir('File uploading failed');
          }
      });
      this.formDataSendFile = null;
    }
  }
  ngOnInit() {
    console.log(this.filesInput);
  }

}
