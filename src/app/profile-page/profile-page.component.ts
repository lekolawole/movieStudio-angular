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
  favs: any = null;
  displayElement: boolean = false;

  constructor(
    public fetchDataApi: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.fetchDataApi.getUser().subscribe((resp: any) => {
        this.user = resp;
        this.fetchDataApi.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie._id)) {
              this.favMovies.push(movie);
              this.displayElement = true;
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

  // remove favorite Movie 
  removeFav(id: string): void {
    this.fetchDataApi.removeFavorite(id).subscribe((res: any) => {
      this.snackBar.open('{{movie.Title}} was removed.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      window.location.reload();
      return this.favs;
    })
  }
}