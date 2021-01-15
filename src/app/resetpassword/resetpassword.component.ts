import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  form:FormGroup;
  href:any;
  error: any;
  userName:any;
  hide = true;

  constructor(private fb:FormBuilder,private authservice:AuthService,private router:Router,private route: ActivatedRoute,private alertService: AlertService) 
  { 
    var mode = this.route.snapshot.queryParams['mode'];
  }

  ngOnInit(): void {
    let passwordregex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    let mode = this.route.snapshot.queryParams['mode'];
    this.form = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(passwordregex)]],
      confirmPassword:['', [Validators.required, Validators.pattern(passwordregex)]],
    });
      this.href = this.router.url;
      this.getUser();
  }
  forgetPassword(){
   this.authservice.sendPasswordResetEmail(this.form.value.email).then(()=>{
    this.error='';
    this.callAlert('Your Password reset email sent to your email id..','sucess!');
   }).catch(_error => {
    this.error = _error   
  })
  }
  confirmPassword(){
    if(this.form.value.newPassword === this.form.value.confirmPassword){
      const code = this.route.snapshot.queryParams['oobCode'];
      this.authservice.confirmPassword(code,this.form.value.confirmPassword).
      then(() => {
        this.error='';
        this.callAlert('Your Password Reset sucessfully','sucess!');
        this.router.navigate(['login'])
      }).catch(_error => {
        this.error = _error   
      })
    }
    else{
      this.callAlert('password incorrect','Fail!');
    }
  }
  getErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  callAlert(message , action){
    this.alertService.openSnackBar(message , action)
  }
  getUser(){
    if(this.authservice.isLoggedIn !==  null){
     var user  = JSON.parse(localStorage.getItem('user'));
     this.userName=user;
     console.log(this.userName);
    }
  }


}
