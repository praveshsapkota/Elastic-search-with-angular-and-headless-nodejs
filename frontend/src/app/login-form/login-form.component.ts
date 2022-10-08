import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(15)]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {

    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
    if (this.password.hasError('pattern')) {
      return 'Only alphanumeric character [ A-Z , 0-9 ]'
    }
    else if (this.password.hasError('maxlength')) {
      return 'password must be less than 16 characters long'
    }
    else if (this.password.hasError('minlength')) {
      return 'password must be at least 8 characters long'
    }
    return ''
  }

}
