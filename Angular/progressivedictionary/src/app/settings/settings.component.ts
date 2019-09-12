import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() language: string;
  @Input() wordsNumber: string;
  @Output() settingChanged = new EventEmitter<any>();

  savedLanguage: string;
  savedWordsNumber: string;

  settingsForm = new FormGroup({
    ctrlLanguage: new FormControl(),
    ctrlWordsNumber: new FormControl()
  });

  constructor() { }

  saveSettings() {
    this.savedLanguage = this.settingsForm.value.ctrlLanguage;
    this.savedWordsNumber = this.settingsForm.value.ctrlWordsNumber;
    this.settingChanged.emit({
      language: this.settingsForm.value.ctrlLanguage,
      wordsNumber: this.settingsForm.value.ctrlWordsNumber
    });
  }
  restoreSettings() {
    this.settingsForm.patchValue( { "ctrlLanguage": this.savedLanguage });
    this.settingsForm.patchValue( { "ctrlWordsNumber": this.savedWordsNumber });
    this.settingChanged.emit({
      language: this.settingsForm.value.ctrlLanguage,
      wordsNumber: this.settingsForm.value.ctrlWordsNumber
    });
  }
  ngOnInit() {
    this.savedLanguage = this.language;
    this.savedWordsNumber = this.wordsNumber;
    this.settingsForm.patchValue( { "ctrlLanguage": this.language });
    this.settingsForm.patchValue( { "ctrlWordsNumber": this.wordsNumber });
  }
}
