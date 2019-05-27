import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUnsecureData() {
    return this.http.get(this.apiUrl + '/unsecured/11', {responseType: 'text'});
  }
  getUserData() {
    return this.http.get(this.apiUrl + '/resource/12', {responseType: 'text'});
  }
  getAdminData() {
    return this.http.get(this.apiUrl + '/resource/1', {responseType: 'text'});
  }

}
