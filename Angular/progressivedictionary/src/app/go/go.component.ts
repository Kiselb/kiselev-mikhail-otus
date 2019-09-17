import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

export const TEST_STATES = {
  STATE_START:  0,
  STATE_TEST:   1,
  STATE_FAILED: 2,
  STATE_FINISH: 3,
}

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
      this.onCommand();
    }
  }
  @Output() startTest = new EventEmitter<any>();
  @Output() testResult = new EventEmitter<any>();

  words: any[] = [];
  wordsCounter: number = 0;
  buttonCaption: string = "Start"
  testMessage: string = "";
  testState: number = TEST_STATES.STATE_FINISH;

  answer = new FormControl('');

  constructor() {
  }
  processState(state: number): number {
    switch(state) {
      case TEST_STATES.STATE_START:
        if (this.words.length === 0) return TEST_STATES.STATE_START;
        return TEST_STATES.STATE_TEST;
      case TEST_STATES.STATE_TEST:
        if ((this.answer.value).toUpperCase() !== this.words[this.wordsCounter].translate.toUpperCase()) return TEST_STATES.STATE_FAILED;
        this.wordsCounter++;
        if (this.wordsCounter === this.words.length) return TEST_STATES.STATE_FINISH;
        return TEST_STATES.STATE_TEST;
      case TEST_STATES.STATE_FAILED:
        this.wordsCounter++;
        if (this.wordsCounter === this.words.length) return TEST_STATES.STATE_FINISH;
        return TEST_STATES.STATE_TEST;
      case TEST_STATES.STATE_FINISH:
        this.words = [];
        this.startTest.emit(true);
        return TEST_STATES.STATE_START;
    }
  }
  onCommand() {
    this.testState = this.processState(this.testState);
    switch(this.testState) {
      case TEST_STATES.STATE_START:
        this.testMessage = "Press next to start test";
        this.buttonCaption = "Start";
        break;
      case TEST_STATES.STATE_TEST:
        this.testMessage = this.words[this.wordsCounter].origin;
        this.buttonCaption = "Next";
        this.answer.setValue('');
        break;
      case TEST_STATES.STATE_FAILED:
        this.testMessage = this.words[this.wordsCounter].origin + ": correct: " + this.words[this.wordsCounter].translate;
        this.buttonCaption = "Next";
        break;
      case TEST_STATES.STATE_FINISH:
        this.testMessage = "Test terminated";
        this.buttonCaption = "Start";
        break;
    }
  }
  ngOnInit() {
  }
}
