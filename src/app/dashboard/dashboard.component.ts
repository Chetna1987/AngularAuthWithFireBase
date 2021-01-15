import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
userName:string;
  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
      this.getUser();
  }
  signOut(){
    this.authservice.logout();
    this.router.navigate(["/login"]);
  }
  getUser(){
    if(this.authservice.isLoggedIn !==  null){
     var user  = JSON.parse(localStorage.getItem('user'));
     this.userName=user.email;
    }
    

  }
}
