---
sidebar_position: 1
---

# Functions

Logic for API queries:

- `userRegistration` → Registers a new user
- `userLogin` → Logs in an existing user
- `getAllMovies` → Retrieves all movies
- `getUser` → Retrieves user data
- `editUser` → Posts updates to user data
- `addFavorite` → Adds a movie ID to user's ```FavoriteMovies```
- `removeFavorite` → `Removes a movie ID from a user's ```FavoriteMovies```
- `getFavoriteMovies` → Retrieves list of user's ```FavoriteMovies```
- `deleteUser` → Deregisters and existing user and removes their data from the API


## Registering a new user

@param `userDetails`
```jsx title="userDetails = { userData }"
{
  Username: "String",
  Password: "String"
}
```

```jsx title="userRegistration( )"
/* 
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * 
   * All CRUD requests expect user token and authentication headers
   * 
 */
  constructor(private http: HttpClient) {
  }
 /**
  * Making the api call for the user registration endpoint
  * @param userDetails {any}
  * @returns new user object in JSON format
  */
  public userRegistration(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
```


## Existing User Login

@param `userData`
```jsx title="userData object"
{
  Username: "String",
  Password: "String"
}
```

```jsx title="userLogin( )"
  public userLogin(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
```

## API queries

API queries are made in the same way. They require a user token and make a **GET request**, which is handled by similar logic.

```jsx title="getAllMovies( )"
/**
   * Handles API to fetch all movies
   * @returns array of movies in JSON format
   */
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
```

## Edit existing user data

Below, is the logic for handling **POST requests**
#
@param `updateUserDetails`

```jsx title="userData object"
{
  Username: "String", 
  Password: "String", 
  Email: "String", 
  Birthday: "String" 
}
```

```jsx title="editUser( )"
/**
   * Handles Editing user profile 
   * @param updateUserDetails {object}
   * @returns updated user's data in JSON format
   */
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
```

## Edit user favorites

Adding and removing movie ID's from a user's `FavoriteMovies` array is handled with **POST** and **DELETE requests** with similar code.
#
@param `movieID` stored as a String
#
@returns `[FavoriteMovies]`

```jsx title="variables"
  user: Object;
  movies: Array;
  favoriteMovies: Array;
  favs: String;
```

Used in [src/movie-card-component.ts](#).

```jsx title="addFavorite( )"
/**
   * Handles Adding movie to favorites 
   * expects movieID & username
   * @param movieID {string}
   * @returns array of user's favorite movies, stored as strings of ID's
   */
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
```
Similar logic is used in `removeFavorite()`.

## Displaying user data 

Display user data with the following functions:
- `getUser()`
- `getFavoriteMovies()`

#
@param `token`

```jsx title="getFavoriteMovies( )"
  /**
   * Handles getting user's FavoriteMovies
   * @returns array of user data [FavoriteMovies]
   */
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
```

## Deregister user account

Delete a user's data from the API with `deleteUser()`:

```jsx title="deleteUser( )"
/**
   * Handles deleting an existing user's account
   * @returns deleted!
   */
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
```

## Error Handling

```jsx title="Extracting Response Data"
private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
```
```jsx title="handleError( )"
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
```
