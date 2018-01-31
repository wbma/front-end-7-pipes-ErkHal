import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { User } from '../models/user';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  userInfo: User;

  constructor(private mediaService: MediaService) { }

  ngOnInit() {

    if(localStorage.getItem('token')) {

      this.mediaService.hasValidToken().subscribe( (response: User) => {
        //console.log(response);
        this.userInfo = response;
      }, err => {
        console.log('Error at validating token @ front');
      });
    } else {
      console.log('Not logged in')
    }
  }
}
