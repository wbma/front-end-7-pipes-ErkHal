import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public mediaService: MediaService, public router: Router) { }

  ngOnInit() {

      if(localStorage.getItem('token')) {
      this.mediaService.hasValidToken().subscribe(response => {
        this.router.navigate(['front']);
      }, err => {
        console.log('Error validating token @ login. Maybe it doesnt exist ');
      });
    }
  }
}
