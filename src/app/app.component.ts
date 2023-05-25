import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin!:boolean ;
  title = 'userManagementProj';
  constructor(private route: Router) {this.isLoggedin() }
  ngOnInit (): void {
    
  }
  isLoggedin() {
    this.isLogin = sessionStorage.getItem('token')? true: false;
  }
  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['login']);
  }
}
