import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


// Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flix-22.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  /* 
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
 */
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint - expects @params userDetails
  public userRegistration(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Handles api call for registered user to login
  public userLogin(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Handles API to fetch movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Handles Profile Page
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    
    return this.http.get(apiUrl + `/users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Handles Editing user profile 
  editUser(updateUserDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    
    return this.http.put(apiUrl + `/users/${username}`, updateUserDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Handles Adding movie to favorites - expects @params movieID & username
  addFavorite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    
    return this.http.post(apiUrl + `/users/${username}/movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Handles removing movies - expects @params movieID & username
  removeFavorite(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    
    return this.http.delete(apiUrl + `/users/${username}/movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Handles getting user's FavoriteMovies
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    
    return this.http.get(apiUrl + `/users/${username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Handles deleting an existing user's account
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    
    return this.http.delete(apiUrl + `/users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

    private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Handles Errors 
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
