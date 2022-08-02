import { Input, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');

  @Input() userData = { 
    Username: this.user.Username, 
    Password: this.user.Password, 
    Email: this.user.Email, 
    Birthday: this.user.Birthday 
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    })
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      // this.dialogRef.close();
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Profile Saved!', 'OK', {
        duration: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    });
    
  }

}
