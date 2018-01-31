import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser: User = {
    username: '',
    password: '',
    email: '',
    full_name: null
  };

  constructor(public mediaService: MediaService) { }

  ngOnInit() {
  }

}
