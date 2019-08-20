import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RetailService {

  constructor(private httpClient: HttpClient) { }

  loginretailData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
 
   
    return this.httpClient.post<any>(environment.apiURL + url, dataToSend,
       { headers: headers,observe: 'response' }) .pipe(map(user => {
        console.log(user);
        
        if (user && user.body.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.body));
        }

        return user;
    }));
  }

  logout(){
    console.log("logout");
    localStorage.removeItem('user');
    
  }

  getGetdData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
   
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.get<any>(environment.adminApiURL + url, dataToSend)
  }

  getPostData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
  
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.post<any>(environment.adminApiURL + url, dataToSend, { headers: headers, responseType: 'json' })
  }
  
  getPutData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
  
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.put<any>(environment.adminApiURL + url, dataToSend, { headers: headers, responseType: 'json' })
  }
  
  getDeleteData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
  
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.delete<any>(environment.adminApiURL + url, dataToSend)
  }
}
