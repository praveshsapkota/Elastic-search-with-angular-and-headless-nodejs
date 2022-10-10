import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }
  api_url = environment.API_URL

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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

  onSubmit = async (loginForm: NgForm) => {
    const body = {
      email: this.email.value,
      password: this.password.value
    }
    const response = await axios.post(this.api_url + 'api/login', body, { withCredentials: true }).catch((err) => {
      console.log(err)
      this.openSnackBar("invalid credentials", "close")
    }).then((data) => {
      this.router.navigate(['/search']);
      return data
    })
    if (response) {
      console.log(response.data)
      this.openSnackBar("logged in successfully", "close")
      localStorage.setItem("jwt_access_token", response.data)
    }
  }

}
