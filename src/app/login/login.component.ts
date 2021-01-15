import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error:any;
  message : any = 'Login Sucessfully.';
  action : any = 'sucess';
  hide = true;

  constructor(private fb: FormBuilder,  private router: Router,private alertService: AlertService,private authservice:AuthService) { }

  ngOnInit(): void {
    let passwordregex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

    this.form = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordregex)]],
    });
  }
  login() {
    this.authservice.login(this.form.controls.email.value, this.form.controls.password.value)
      .then(()=>
        { 
          this.error='';
          this.callAlert(this.message,this.action);
          this.router.navigate(["/dashboard"]);
        }).catch(_error => {
          this.error = _error;
        });
      
  }
  signUp() {
    this.authservice.register(this.form.controls.email.value, this.form.controls.password.value)
      .then(()=>
        {
          this.error='';
          this.callAlert(this.message,this.action);
          this.router.navigate(["/dashboard"]);
        }).catch(_error => {
          this.error = _error;
          this.router.navigate(["/login"]);
        });
      
  }
  verifyEmail(){
    var data=this.authservice.SendVerificationMail();
    console.log(data);
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

}
