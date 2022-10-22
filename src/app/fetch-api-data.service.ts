import { Injectable } from '@angular/core';
//import { catchError } from 'rxjs/internal/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://protected-river-88909.herokuapp.com/';

// Get Authorization token stored in local storage
const token = localStorage.getItem('token');

// Get Username stored in local storage
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // api call user registration endpoint
  /**
   * @service POST to an API endpoint to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `users`, userDetails).pipe(
    catchError(this.handleError)
    );
  }


  //API call to login a user
  /**
   * @service POST to an API endpoint to login a user
   * @param {any} userDetails
   * @returns a user object in json format
   * @function userLogin
   * @returns
   */  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `login`, userDetails).pipe(
    catchError(this.handleError)
    );
  }

  //API Endpoint for getting All Movies
  /**
   * @service GET to an API endpoint to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */  
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError)
    );
  }

  //API Endpoint for getting Movie by Title
  /**
   * @service GET to an API endpoint to get a movie by title
   * @param {string} title
   * @returns a an array of movie objects in json format
   * @function getMovieByTitle
   */
  getSingleMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}`,
    {headers: new HttpHeaders({Authorization: 'Bearer ' + token,})
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for director endpoint
  getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/director/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for getting genre endpoint
  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genre/${genreName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //API Endpoint to get specific user Info
  /**
   * @service GET to an API endpoint to get a specific user
   * @param {string} userName
   * @returns a user object in json format
   * @function getUser
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `user/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //API Endpoint to add favorite movie to user's list
  /**
   * @service POST to an API endpoint to add a movie to a user's favorites list
   * @param {string} userName
   * @param {string} id
   * @returns a user object in json format
   * @function addFavorite
   */
  addFavouriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  
  // API call for display favourite movie list of a user
  getFavouriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    console.log(username);
    return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //API Endpoint to update user Details
  /**
   * @service PUT to an API endpoint to update a user's details
   * @param {string} userName
   * @param {any} userData
   * @returns a user object in json format
   * @function editUser
   */
  public editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, updateDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  //API Endpoint to remove favorite movie from user's list
  /**
   * @service DELETE to an API endpoint to remove a movie from a user's favorites list
   * @param {string} userName
   * @param {string} id
   * @returns a user object in json format
   * @function addFavorite
   */
  public removeFavouriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //API Endpoint to delete a user
  /**
   * @service DELETE to an API endpoint to delete a user
   * @param {string} userName
   * @returns success message
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

