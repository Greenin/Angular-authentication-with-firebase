import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user: User;  
    bPressSignUp: boolean;  

    constructor(
        public router: Router,
        public ngZone: NgZone,
        public afAuth: AngularFireAuth,
        private angularFireAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(user => {
            this.user = user;
        });

        console.log('this.bPressSignUp: ',this.bPressSignUp);
        if (this.bPressSignUp){
            //this.bPressSignUp= false; 
            console.log('this.bPressSignUp: ',this.bPressSignUp);
        }

    }

    // Firebase SignInWithPopup
    OAuthProvider(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((res) => {
                this.ngZone.run(() => {
                    this.router.navigate(['dashboard']);
                })
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Firebase Google Sign-in
    SigninWithGoogle() {
        return this.OAuthProvider(new auth.GoogleAuthProvider())
            .then(res => {
                console.log('Successfully logged in!')
            }).catch(error => {
                console.log(error)
            });
    }

    // Firebase Logout 
    SignOutGoogle() {
        return this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['login']);
        })
    }





 // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }


  NavigateSignUp() {
    this.router.navigate(['signup']);
  }




  /* Sign up */
  //SignUp(email: string, password: string) {
  SignUp(form) {
    //console.log('>>>>>form.value: ',form); 
    let email = form.email;
    let password = form.pwd;
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  /* Sign in */
  //SignIn(email: string, password: string) {
  SignIn(form){
    //console.log('>>>>>form.value: ',form);
    let email = form.email;
    let password = form.pwd;
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }  



}