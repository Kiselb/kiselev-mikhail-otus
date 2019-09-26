import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName: string = "@USER_NAME";

  profileForm = new FormGroup({
    ctrlSurName: new FormControl(),
    ctrlFirstName: new FormControl(),
    ctrlMiddleName: new FormControl(),
    ctrlPosition: new FormControl(),
    ctrlPhone: new FormControl(),
    ctrlEMail: new FormControl(),
  });

  passwordForm = new FormGroup({
    ctrlPassword: new FormControl(),
    ctrlPasswordConfirm: new FormControl(),
  });

  constructor() { }

  saveProfile() {}
  savePassword() {}

  ngOnInit() {
  }

}
