import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import BookClass from '../_Model/Book';
import BookViewModel from '../_Model/BookViewModel';

@Injectable({
  providedIn: 'root'
})
export class BookservService {

  constructor(public http:HttpClient) { }
  urlcon:string="http://localhost:50565/";
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
  /*********************************************************************** */
  DownloadExel(){
    return this.http.get(this.urlcon+"Book/Exel",this.header).pipe();  
  }
  GetAllBooks(){
    return this.http.get<BookViewModel[]>(this.urlcon+"Book/allbooks",this.header).pipe();
  } 
  PostBook(Book:BookClass){
    return this.http.post<BookClass>(this.urlcon+"Book/AddBook",Book,this.header).pipe();
} 
  UpdateBook(Book:BookClass){
    return this.http.put<BookClass>(this.urlcon+"Book/UpdateBook",Book,this.header).pipe();
} 
  DeleteBook(id:number){
    return this.http.delete<BookClass>(this.urlcon+"Book/DeleteBook/"+id,this.header).pipe();
}
 
}
