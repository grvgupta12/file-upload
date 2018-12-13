import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { HttpHeaders } from '@angular/common/http'; //import http client
import { Headers } from '@angular/http';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  headers: Headers = new Headers();

  constructor(private fileUploadService: FileUploadService) { }

 

  ngOnInit() {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'image/jpeg',
      'Accept': 'application/json'
    })
  };


  selectedFile: ImageSnippet;



  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.fileUploadService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

}


