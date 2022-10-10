import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router"
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResponse = []
  moviesLength: number = 0;
  p: number = 1;
  constructor(private _snackBar: MatSnackBar, private router: Router) { }
  api_url = environment.API_URL
  searchButton = faMagnifyingGlass
  ngOnInit(): void {

  }
  search = new FormControl('');
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  onSubmit = async () => {
    const response = await axios.get(this.api_url + `api/search?title=${this.search.value}`, {
      withCredentials: true, headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt_access_token")}`
      }
    }).catch((err) => {
      console.log(err)
      this.openSnackBar("please login to preform search", "close")
      this.router.navigateByUrl('/login')
    }).then((data) => {
      return data
    })
    if (response) {
      if (response.data == null) {
        this.openSnackBar("no result found", "close")
      }
      this.searchResponse = response.data.Search

      console.log(this.searchResponse)

    }
  }

}
