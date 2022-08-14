import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  movies: any = [];
  username: any = localStorage.getItem('user');
  favMovies: any[] = [];
  favs: any = null; // used to retrieve data about FavoriteMovies, i.e. whether a selected movies is Favorite'd or not
  
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    const user = localStorage.getItem('user');

    // This code generates data to dispay in "My Movies" section 
    if (user) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie._id)) {
              this.favMovies.push(movie);
            }
          })
        })
      })
    }
  }

  toMain(): void {
    this.router.navigate(['movies']);
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: 'max-content'
    })
  }

  isFav(id: string): boolean {
    return this.favMovies.includes(id);
  }

  // Function that removes favorite Movie from user's array 
  removeFav(id: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((res: any) => {
      this.snackBar.open('Removed', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      window.location.reload();
      return this.favs;
    })
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

/**
 * Deletes existing User with a browser alert window
 * Makes API DELETE request
 * Navigates to Welcome page and clears local storage
 */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted.', 'OK', {
          duration: 2000,
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}
