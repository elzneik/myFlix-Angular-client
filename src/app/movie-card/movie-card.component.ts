import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

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

  /** @constructor */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavouriteMovies();
}

/**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

/**
   * Gets favorite movies from api call and sets the favorite movies variable to return JSON file
   * @returns array holding ids of user's favorite movies
   * @function getFavoriteMovies
   */


getFavouriteMovies() : void {
  this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
    this.favouriteMovies = resp;
    console.log(this.favouriteMovies);
    return this.favouriteMovies;
  });
}


  /**
   * checks if a movie is included in the user's list of favorite movies
   * @param id
   * @returns true, if the movie is a favorite move, else false
   */


isFav(id: string): boolean {
  return this.favouriteMovies.includes(id);
}


  /**
   * opens the user genre dialog from GenreComponent to displaying details
   * @param name
   * @param description
   */

openGenreDialog(name: string, description: string): void {
  this.dialog.open (GenresComponent, {
    data: { 
      Name: name,
      Description: description,
  },
  width: "500px",
  });
}

  /**
   * opens the user director dialog from DirectorComponent to displaying details
   * @param name
   * @param bio
   * @param birthday
   */

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

  /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param name
   * @param description
   */

openDescriptionDialog(title: string, description: string): void {
  this.dialog.open(DescriptionComponent, {
    data: {
      Title: title,
      Description: description,
    },
    width: "500px",
  });
}

  /**
   * adds a movie to the list of favorite movies via an API call
   * @param id
   * @function addFavoriteMovie
   */

addFavouriteMovie(id: string): void {
  console.log(id);
  this.fetchApiData.addFavouriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  });
}

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id
   * @function removeFavoriteMovie
   */

removeFavouriteMovie(id: string): void {
  console.log(id);
  this.fetchApiData.removeFavouriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  });
}
}
