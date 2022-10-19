import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {}


  /**
   * navigate to movie overview
   */
  gotoMovies() : void {
    this.router.navigate(["movies"]);
  }

    /**
   * navigate to profile overview
   */
 gotoProfile() : void {
  this.router.navigate(["profile"]);
}

/**
   * navigate to welcome page by logging out overview
   */
 logOut() : void {
  localStorage.clear();
  this.router.navigate(["welcome"]);
}

}
