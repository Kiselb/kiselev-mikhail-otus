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
  mode: boolean;
  fragment = new FormControl('');

  constructor() {
    this.mode = true; //View the dictionary
  }

  toogleMode() {
    this.mode = !this.mode;
    if  (this.mode) {
      this.fragmentAdded.emit(this.fragment.value);
      this.fragment.setValue('');
    }
  }
  ngOnInit() {
  }
}
