import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    ctrlName: new FormControl(),
    ctrlEMail: new FormControl(),
    ctrlPassword: new FormControl(),
    ctrlPasswordConfirm: new FormControl(),
  });

  constructor() {
    
  }

  register() {

  }

  ngOnInit() {
  }

}
