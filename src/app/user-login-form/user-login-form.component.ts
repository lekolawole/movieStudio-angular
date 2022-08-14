import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  
  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);

  // Add username & password to localStorage to retrieve later
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', result.user.Username);

      this.snackBar.open('Login Successful!', 'OK', {
          duration: 2000
      });
  // Navigate to movies page
  // Does not navigate if login is unsuccessful
        this.router.navigate(['movies']);
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
      });
    });
  }
}
