import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from  '@angular/common/http';
import { UploadFileService } from '../upload-file.service'

@Component({
  selector: 'app-import-order',
  templateUrl: './import-order.component.html',
  styleUrls: ['./import-order.component.css']
})
export class ImportOrderComponent implements OnInit {
  
  LOADING_FILE_STATE = {
    IDLE      : 0,
    INPROCESS : 1,
    OK        : 2,
    FAILED    : 3,
  }
  state: number = this.LOADING_FILE_STATE.IDLE;
  
  @ViewChild('selectfilesinput', { static: true })
  filesInput: ElementRef;

  fgSelectFile: FormGroup = null;
  fgImportParameters: FormGroup = null;
  formDataSendFile: FormData = null;
  errorMessage: string = "";

  constructor(private uploadFileService: UploadFileService) {
  }
  openFileDialog() {
    this.filesInput.nativeElement.click();
  }
  onChangeFile(event) {
    if (event.target.files.length > 0) {
      this.formDataSendFile = new FormData();
      this.formDataSendFile.append('file', event.target.files[0]);
    }
  }
  uploadFile() {
    if (this.fgImportParameters.valid) {
      if (this.formDataSendFile) {
        this.formDataSendFile.append("sheetname", this.fgImportParameters.get("ctrlSheetName").value)
        this.formDataSendFile.append("firstrow", this.fgImportParameters.get("ctrlFirstRow").value)
        this.formDataSendFile.append("lastrow", this.fgImportParameters.get("ctrlLastRow").value)
        this.formDataSendFile.append("columnarticle", this.fgImportParameters.get("ctrlColumnArticle").value)
        this.formDataSendFile.append("columnquantity", this.fgImportParameters.get("ctrlColumnQuantity").value)
        this.state = this.LOADING_FILE_STATE.INPROCESS;
        this.uploadFileService.upload(this.formDataSendFile)
          .subscribe(
            (response: HttpResponse<any>) => {
              setTimeout(() => this.state = this.LOADING_FILE_STATE.OK, 5000); // For demonstration purpose
            },
            (error: HttpErrorResponse) => {
              if (error.error instanceof ErrorEvent) {
                this.errorMessage = error.error.message;
              } else {
                if (error.status === 400) {
                  this.errorMessage = `Ошибка входных данных: ${error.error.error}`;
                } else if (error.status === 500) {
                  this.errorMessage = `Ошибка обработки файла на стороне сервера: ${error.error.error}`;
                } else {
                  this.errorMessage = `Сервер вернул ошибку: ${error.status} : ${error.error}`;
                }
              }
              this.state = this.LOADING_FILE_STATE.FAILED;
            }
          );
        this.formDataSendFile = null;
        this.fgSelectFile.patchValue({ "ctrlFileName": "" });
      }
    }
  }
  continueAfterOK() {
    this.state = this.LOADING_FILE_STATE.IDLE;
  }
  continueAfterFAILED() {
    this.state = this.LOADING_FILE_STATE.IDLE;
  }
  ngOnInit() {
    this.fgSelectFile = new FormGroup({
      ctrlFileName: new FormControl(),
    });
    this.fgImportParameters = new FormGroup({
      ctrlSheetName: new FormControl("Лист1", Validators.required),
      ctrlFirstRow: new FormControl(2, [Validators.required, Validators.min(1), Validators.max(255)]),
      ctrlLastRow: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(2048)]),
      ctrlColumnArticle: new FormControl(2, [Validators.required, Validators.min(1), Validators.max(255)]),
      ctrlColumnQuantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(255)]),
    });
  }
}
