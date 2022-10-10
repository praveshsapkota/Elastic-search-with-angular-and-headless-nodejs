import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public cookie_name = '';
  constructor(private cookieService: CookieService) {
  }

  isLoggedIn = () => {
    if (this.cookie_name.length != 0) {
      return true
    }
    return false
  }

  deleteCookie = () => {
    this.cookieService.delete('jwt_access_token');
  }

  ngOnInit(): void {
    console.log("inside oninit")
    this.cookie_name = this.cookieService.get('jwt_access_token');
  }

  title = 'frontend';
}
