import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


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
  movies: any[] = [];
  userFavs: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService, 
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Newly implemented function that will fetch movies from fetchApiDataService
    this.getAllMovies();
    this.getUser;
  }

  // Defining what getMovies() will do 
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
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
      console.log(response);
      this.ngOnInit();
    });
  }

  // Gets user to check Favorites 
  getUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userFavs = resp.user.FavoriteMovies;
    })

  }
  // Checks if movie is already favorited (T/F)
  isFav(id: string): boolean {
    return this.userFavs.includes(id);
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }
}
