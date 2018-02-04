import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RegisterResponse } from '../models/register-response';

@Injectable()
export class MediaService {

  rootAPIUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient, private router: Router) { }

//Creates a new user to the server
  register(newUser: User) {

    this.http.post(this.rootAPIUrl + 'users', newUser)
      .subscribe( (response: RegisterResponse) => {
        //Login user after registering
        this.login(newUser.username, newUser.password);

        return response;
      }, err => {
        console.log("Couldn't register user; " + err);
        return err;
      });
  }

  //Uploads new media to server
  upload(formData: FormData) {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.post(this.rootAPIUrl + 'media', formData, reqSettings);
  }

//Log the user into the server to get a token
  login(username: string, password: string) {

    const requestBody = {
      username: username,
      password: password
    };

    this.http.post<LoginResponse>(this.rootAPIUrl + 'login', requestBody)
    .subscribe( loginResponse => {

      localStorage.setItem('token', loginResponse.token);

      //console.log("token set in localstorage: " + localStorage.getItem('token'));

      this.router.navigate(['front']);

    }, err => {
      console.log('Something went very wrong. Heres why: ' + err.message);
    });
  }

  hasValidToken() {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.get(this.rootAPIUrl + 'users/user', reqSettings);
    }
  }
