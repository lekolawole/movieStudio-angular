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
  // Logic for a successful user login goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);

  // Add username & password to localStorage
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', result.user.Username);

      this.snackBar.open('Login Successful!', 'OK', {
          duration: 2000
      });
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
      });
    });
    // Navigate to movies page
    this.router.navigate(['movies']);
  }
}
