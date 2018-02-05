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

  newestImages: any;

  picIndex = 0;

  constructor(private mediaService: MediaService) { }

  ngOnInit() {

    if(localStorage.getItem('token')) {

      this.mediaService.hasValidToken().subscribe( (response: User) => {
        this.userInfo = response;
      }, err => {
        console.log('Error at validating token @ front');
      });
    } else {
      console.log('Not logged in');
    }

    this.mediaService.getNewImages(this.picIndex.toString()).subscribe( result => {
      this.newestImages = result;
      this.picIndex += 10;
    }, err => {
      console.log(err);
    })
  }

  loadMore() {
    this.mediaService.getNewImages(this.picIndex.toString()).subscribe( (result: Object[]) => {
      this.newestImages.push(...result);
      this.picIndex += 10;
    }, err => {
      console.log(err);
    })
  }
}
