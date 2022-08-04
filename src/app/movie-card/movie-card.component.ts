import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { UserRegistrationService } from '../fetch-api-data.service'
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MovieDetailsCardComponent } from '../movie-details-card/movie-details-card.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // Returns movies from API in variable called movies
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favs: any = null;

  constructor(
    public fetchApiData: UserRegistrationService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Newly implemented function that will fetch movies from fetchApiDataService
    this.getAllMovies();
    this.getUser();
  }

  // Defining what getMovies() will do 
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      //console.log(this.movies);
      return this.movies;
    });
  }

  // Opens Genre dialog
  // expects name, description
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name, 
        Description: description,
      }, 
      width: '480px',
    });
  }

  // Opens Movie Director Dialog
  // Expects name, bio
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio
      },
      width: '480px',
    });
  }

  // Opens Summary (movie details card) dialog
  openSummaryDialog(description: string): void {
    this.dialog.open(MovieDetailsCardComponent, {
      data: {
        Description: description
      },
      width: '500px',
    })
  }

  // Adds movies to Favorite Movies array 
  // Expects Movie ID
  addFavorite(id: string): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.addFavorite(id).subscribe((response: any) => {
      // console.log(response);
      this.ngOnInit();
      return this.favs;
    });
  }

  // Gets user to check Favorites 
  getUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovies = response.FavoriteMovies;
      console.log(this.favoriteMovies);
    })
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((response: any) => {
      this.favoriteMovies = response.user.FavoriteMovies;
      console.log(response);
      return this.favoriteMovies;
    });
  }

  // Checks if movie is already favorited (T/F)
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  removeFav(id: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((res: any) => {
      this.ngOnInit();
      return this.favs;
    });
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
