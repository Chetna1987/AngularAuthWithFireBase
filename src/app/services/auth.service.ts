import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  
  constructor(private authService: AngularFireAuth, private router: Router) {
    this.authService.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

async login(email: string, password: string) {
    var result = await this.authService.signInWithEmailAndPassword(email, password)
    return result;
}

async register(email: string, password: string) {
  var result = await this.authService.createUserWithEmailAndPassword(email, password)
  this.SendVerificationMail();

}

async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.authService.sendPasswordResetEmail(passwordResetEmail);
}

async confirmPassword(code:string,password:string){
  return await this.authService.confirmPasswordReset(code, password);
}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}
async logout(){
  await this.authService.signOut();
  localStorage.removeItem('user');
  
}
 // Send email verification when new user sign up
 async SendVerificationMail() {
   return (await this.authService.currentUser).sendEmailVerification()
 
}
}
