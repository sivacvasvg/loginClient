import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  userAction: any;
  form: FormGroup = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.userAction = this.data;
    if(this.data?.mode == 'edit') {
      this.editUserForm();
    }
  }
  addUserData() {
      if (this.form.valid) {
        console.log(this.form.value);
        if(this.form.value?.id=='') {
          this.http.post('http://localhost:3000/api/add-user', this.form.value)
          .subscribe((data: any) => { 
            console.log(data);
            this.dialogRef.close();
            this.router.navigateByUrl('login', {skipLocationChange: true}).then(() => {
              this.router.navigate(['user-list']);
              this.openSnackBar('User Record Added Successfully!');
            });
          });
        } else if(this.form.value?.id!='') {
          this.http.post('http://localhost:3000/api/update-user', this.form.value)
          .subscribe((data: any) => { 
            console.log(data);
            this.dialogRef.close();
            this.router.navigateByUrl('login', {skipLocationChange: true}).then(() => {
              this.router.navigate(['user-list']);
              this.openSnackBar('User Record Updated Successfully!');
            });
          });
        }
      }

  }

  editUserForm() {
    let userObj = this.userAction?.userObj;
    this.form.setValue({
      id: userObj.id,
      name: userObj.name,
      phone: userObj.phone,
      address: userObj.address,
      state: userObj.state,
      city: userObj.city
    })
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }
  
  
}
