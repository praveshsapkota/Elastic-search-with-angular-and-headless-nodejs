import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private _snackBar: MatSnackBar, private cookieService: CookieService) { }
  isLoggedIn = () => {
    if (localStorage.getItem('jwt_access_token') != null) {
      return true
    }
    return false
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  deleteCookie = () => {
    localStorage.removeItem('jwt_access_token');
    this.openSnackBar("logged out successfully", "close")
    this.router.navigateByUrl("/")
  }
  OnClick = () => {
    this.router.navigateByUrl('/login')
  }
  Home = () => {
    this.router.navigateByUrl("/")
  }
  Search = () => {
    this.router.navigateByUrl("/search")
  }
  ngOnInit(): void {
  }

}
