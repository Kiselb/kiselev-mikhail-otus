import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  @Input() dictionary: any[];
  @Output() fragmentAdded = new EventEmitter<any>();

  mode: boolean = true; //View the dictionary
  buttonText: string = "Add";
  fragment = new FormControl('');

  constructor() {}

  toogleMode() {
    console.log('toogle')
    this.mode = !this.mode;
    if (this.mode) {
      this.buttonText = "Add"
      this.fragmentAdded.emit(this.fragment.value);
      this.fragment.setValue('');
    } else {
      this.buttonText = "Save"
    }
  }
  ngOnInit() {
  }
}
