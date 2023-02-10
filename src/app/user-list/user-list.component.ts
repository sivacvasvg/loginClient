import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { AddUserComponent } from "./../add-user/add-user.component";
import { Router } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface userInterface {
id: any;
name: string;
phone: number;
address: string;
state: string;
city: string;
}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  entryComponents: [AddUserComponent]
})
export class UserListComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns = [
    'name',
    'phone',
    'address',
    'state',
    'city',
    'star'
  ];
  
  dataSource:userInterface[]  = [];

  constructor(public dialog: MatDialog, private http: HttpClient, private route: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserList();
  }

    
  openSnackBar() {
    this._snackBar.open('User record has been removed!', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  addUser(mode: string, userObj?: userInterface) {
    const dialogRef = this.dialog.open(AddUserComponent, {data: {mode: mode, userObj: userObj}});
    dialogRef.updateSize('30%', '70%');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  getUserList() {
      this.http.get('http://localhost:3000/api/user-list')
      .subscribe((data: any) => { 
        console.log(data);
        this.dataSource = data?.response;
      });
  }
  getUserDetail(userRef: userInterface) {
    this.route.navigate(['user-details', userRef.id]);
  }
  
  deleteUser(userRef: userInterface) {
    this.http.post('http://localhost:3000/api/delete-user', userRef)
    .subscribe((data: any) => { 
      console.log(data);
      this.getUserList();
      this.openSnackBar();
    });
  }



}
