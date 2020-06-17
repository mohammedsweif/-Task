import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registerr } from '../_Models/Register';
import loginClass from '../_Models/LoginClass';
@Injectable({
  providedIn: 'root'
})
export class AuthservService {
  urlcon:string="http://localhost:50565/account/";
  header={
    headers:new HttpHeaders({
  "Content-Type":"application/json"
    })
  }
  header2={
    headers:new HttpHeaders({
  "Content-Type":"application/json",
  "Authorization": "bearer "+localStorage.getItem("token")
    })
  }
    constructor( public http:HttpClient) { }
    register(obj:Registerr):Observable<Registerr>{
      return this.http.post<Registerr>(this.urlcon+"Register",obj,this.header).pipe();
    } 
   
     login(obj:loginClass):Observable<loginClass>{
      return this.http.post<loginClass>(this.urlcon+"Login",obj,this.header).pipe();
    }
    logout(){
      return this.http.get(this.urlcon+"logout",this.header).pipe();
    }
}
