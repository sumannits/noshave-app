import { Injectable } from '@angular/core';
import {Headers, Http, Response, URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

let apiUrl = 'https://www.basemarket.mx/webservice/';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Api {
  
  constructor(public http: Http,public loadingCtrl: LoadingController) {
    //console.log('Hello AuthServiceProvider Provider');
  }
  public details ;
  postData(credentials, type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    return new Promise((resolve, reject) => {
      //let headers = new Headers();
      //headers.append("Content-Type","application/json");
      const headerDict = {
        'Content-Type': 'application/json',
      }
      const requestOptions = {                                                                    headers: new Headers(headerDict), 
      };

      this.http.post(apiUrl + type, JSON.stringify(credentials),requestOptions).subscribe(res => {
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          //console.log(err);
          reject(err);
          loading.dismiss();
        });
    });
  }


  getData(type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //console.log(type);
    return new Promise((resolve, reject) => {
      //let headers = new Headers();
      const headerDict = {
        'Content-Type': 'application/json',
      }
      const requestOptions = {                                                                    headers: new Headers(headerDict), 
      };

      this.http.get(apiUrl + type,requestOptions).subscribe(res => {
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          //console.log(err);
          reject(err);
          loading.dismiss();
        });
    });
  } 
  
  patchData(credentials, type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    return new Promise((resolve, reject) => {
      //let headers = new Headers();
      //headers.append("Content-Type","application/json");
      const headerDict = {
        'Content-Type': 'application/json',
      }
      const requestOptions = {                                                                    headers: new Headers(headerDict), 
      };

      this.http.patch(apiUrl + type, JSON.stringify(credentials),requestOptions).subscribe(res => {
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          //console.log(err);
          reject(err);
          loading.dismiss();
        });
    });
  }

}
