import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'

import { GenresComponent } from '../genres/genres.component';
import { DirectorsComponent } from '../directors/directors.component';
import { DescriptionComponent  } from '../description/description.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favouriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavouriteMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

getFavouriteMovies() : void {
  this.fetchApiData.getFavouriteMovie().subscribe((resp: any) => {
    this.favouriteMovies = resp;
    console.log(this.favouriteMovies);
    return this.favouriteMovies;
  })
}

isFav(id: string): boolean {
  return this.favouriteMovies.includes(id);
}

openGenreDialog(name: string, description: string): void {
  this.dialog.open (GenresComponent, {
    data: { 
      Name: name,
      Description: description,
  },
  width: "500px",
  });
}

openDirectorDialog(name: string, bio: string, birthday: string): void {
  this.dialog.open (DirectorsComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birthday: birthday,
    },
    width: "500px",
  });
}

openDescriptionDialog(name: string, description: string): void {
  this.dialog.open(DescriptionComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: "500px",
  });
}

addFavouriteMovie(id: string): void {
  console.log(id);
  this.fetchApiData.addFavouriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  });
}

removeFavouriteMovie(id: string): void {
  console.log(id);
  this.fetchApiData.removeFavouriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  });
}
}
