import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from  '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LOADING_FILE_STATE, IAppState } from '../../store/state';
import { uploadFile, uploadFileInProgress, uploadFileResume } from '../../store/actions';
import { UploadFileService } from '../upload-file.service';
import { loadingFileState, loadingFileError, currentOrderId } from '../../store/selectors';

@Component({
  selector: 'app-import-order',
  templateUrl: './import-order.component.html',
  styleUrls: ['./import-order.component.css']
})
export class ImportOrderComponent implements OnInit {
  
  LOADING_FILE_STATE = LOADING_FILE_STATE;

  @ViewChild('selectfilesinput', { static: true })
  filesInput: ElementRef;

  fgSelectFile: FormGroup = null;
  fgImportParameters: FormGroup = null;
  formDataSendFile: FormData = null;

  loadingFileState$: Observable<LOADING_FILE_STATE> = this.appStore.pipe(select(loadingFileState));
  loadingFileError$: Observable<string> = this.appStore.pipe(select(loadingFileError));
  currentOrderId$: Observable<number> = this.appStore.pipe(select(currentOrderId));

  orderId: number = 0;

  constructor(private appStore: Store<IAppState>) {
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
        this.appStore.dispatch(uploadFileInProgress());
        this.formDataSendFile.append("orderid", this.orderId.toString());
        this.formDataSendFile.append("sheetname", this.fgImportParameters.get("ctrlSheetName").value);
        this.formDataSendFile.append("firstrow", this.fgImportParameters.get("ctrlFirstRow").value);
        this.formDataSendFile.append("lastrow", this.fgImportParameters.get("ctrlLastRow").value);
        this.formDataSendFile.append("columnarticle", this.fgImportParameters.get("ctrlColumnArticle").value);
        this.formDataSendFile.append("columnquantity", this.fgImportParameters.get("ctrlColumnQuantity").value);
        setTimeout(() => this.appStore.dispatch(uploadFile({ formData: this.formDataSendFile })), 5000); // Delay for demonstration purpose only
      }
    }
  }
  continueAfterOK() {
    this.appStore.dispatch(uploadFileResume());
  }
  continueAfterFAILED() {
    this.appStore.dispatch(uploadFileResume());
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
    this.loadingFileState$.subscribe(state => {
      if (state === LOADING_FILE_STATE.OK || state === LOADING_FILE_STATE.FAILED) {
        this.formDataSendFile = null;
        this.fgSelectFile.patchValue({ "ctrlFileName": "" });            
      }
    });
    this.currentOrderId$.subscribe(id => {
      this.orderId = id;
    });
  }
}
