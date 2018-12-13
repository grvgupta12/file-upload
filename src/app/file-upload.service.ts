import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //import http client
import { Observable } from 'rxjs';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';




@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'image/jpeg'     
    })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('https://api.github.com/users/seeschweiler');
  };

  postData(objectData): Observable<any> {
    return this.http.post('http://jsonplaceholder.typicode.com/posts', objectData);
  }


  private apiBaseUrl = 'https://hqwebinar.com:7007/v3/uploadFile';

  fileData(data):Observable<any>{
    return this.http.post(this.apiBaseUrl,data,this.httpOptions);
  }

  
  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('https://hqwebinar.com:7007/v3/uploadFile', formData);
  }

  // private apiBaseUrl = 'http://api-test.com';
  // headers: Headers = new Headers();

  // makeRequest(endPoint: string, method: string, body = null, headers: Headers = new Headers()) {
  //   let url = this.apiBaseUrl + endPoint;
  //   this.headers = headers;
  //   if (method == 'GET') {
  //     let options = new RequestOptions({ headers: this.headers });
  //     return this.http.get(url, options)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  //   } else if (method == 'POST') {
  //     let options = new RequestOptions({ headers: this.headers });
  //     return this.http.post(url, body, options)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  //   }
  // }
  // extractData(extractData: any): any {
  //   throw new Error("Method not implemented.");
  // }
  // handleError(handleError: any): any {
  //   throw new Error("Method not implemented.");
  // }


}

