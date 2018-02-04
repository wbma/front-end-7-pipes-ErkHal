import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  formData = new FormData();   //Upload form data is stored in this variable

  canUpload = false;

  constructor(private mediaService: MediaService) { }

  ngOnInit() {

    //Template doesn't show upload form if the user isn't logged in
    if(localStorage.getItem('token')) {
      this.mediaService.hasValidToken().subscribe( result => {
        this.canUpload = true;
      }, err => {
        this.canUpload = false;
        console.log("Couldn't find legit token.");
      });
    }
  }

  onSubmit(uploadForm) {

    this.formData.append('title', uploadForm.title);
    this.formData.append('description', uploadForm.description);

    uploadForm.reset();
      this.mediaService.upload(this.formData).subscribe( result => {
        console.log('Media uploaded');
      }, (err) => {
        console.log('Something went wrong');
        console.log(err);
      });
    }

  onFileSelect(event) {
    console.log(event.target.files);

    this.formData.append('file', event.target.files[0]);

  }

}
