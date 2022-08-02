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
}
