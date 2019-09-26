import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    ctrlName: new FormControl(),
    ctrlPassword: new FormControl()
  });

  constructor() { }

  tryLogin() {
    console.log("User is logged in");
  }

  ngOnInit() {
  }

}
