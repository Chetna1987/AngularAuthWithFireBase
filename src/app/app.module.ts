import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**import Firebase Modules**/
import { AngularFireModule } from '@angular/fire';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

var config={
  apiKey: "AIzaSyCMf9Gy4YZnUqBJcN31E-5zDY277Vim9sg",
  authDomain: "fir-auth-41e65.firebaseapp.com",
  databaseURL: "https://fir-auth-41e65-default-rtdb.firebaseio.com",
  projectId: "fir-auth-41e65",
  storageBucket: "fir-auth-41e65.appspot.com",
  messagingSenderId: "708940932675",
  appId: "1:708940932675:web:da28d469075009e95516f6",
  measurementId: "G-W58J4YRCBL"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetpasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
