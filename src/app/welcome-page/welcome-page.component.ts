import { Component } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
// import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
// import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
// import { MatDialog } from '@angular/material/dialog';
// import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  // selector: 'app-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss']
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

// export class AppComponent {
  // title = 'myFlix-Angular-client';
  // constructor(public dialog: MatDialog) { }

  export class WelcomePageComponent implements OnInit {

    constructor(public dialog: MatDialog) {}
    ngOnInit(): void {}

    // This is the function that will open the dialog when the signup button is clicked  
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
    // Assigning the dialog a width
        width: '280px'
        });
      }

    // This is the function that will open the dialog when the logIn button is clicked  
    openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
    // Assigning the dialog a width
      width: '280px'
      });
    }

  /*
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
  */
  }
