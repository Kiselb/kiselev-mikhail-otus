import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  @Input() set testWords(testWords: any[]) {
    if (testWords) {
      this.words = testWords;
      this.wordsCounter = 0;
      this.testMode = true;
      this.onCommand();
    }
  }
  @Output() startTest = new EventEmitter<any>();
  @Output() testResult = new EventEmitter<any>();

  words: any[];
  wordsCounter: number;
  testMessage: string;
  testMode: boolean;

  answer = new FormControl('');

  constructor() {
    this.testMode = false;
    this.testMessage = "Press Start button"
  }

  onCommand() {
    if (this.testMode) {
      this.testMessage = this.words[this.wordsCounter].origin;
      this.wordsCounter++;
      if (this.wordsCounter === this.words.length) {
        this.testMode = false;
        this.testMessage = "Test terminated"
      }
    } else {
      this.startTest.emit(true);
    }
  }
  ngOnInit() {
  }
}
