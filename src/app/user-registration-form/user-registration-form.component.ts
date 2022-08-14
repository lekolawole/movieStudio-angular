import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  // Creating the object to store User's Data
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

ngOnInit(): void {
}

/**
 * This is the function responsible for sending the form inputs to the backend
 * Sends userData to userRegistation from fetchApiData in fetch-api-data.service.ts
 * @returns new object with user data
 * 
*/
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
     this.dialogRef.close();
     console.log(result);
     this.snackBar.open('Registration Sucessful! Please login.', 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}