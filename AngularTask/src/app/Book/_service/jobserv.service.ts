import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import JobClass from '../_Model/Job';

@Injectable({
  providedIn: 'root'
})
export class JobservService {

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
  
  /**************************************************************** */
  GetAllJobs() {
    return this.http.get<JobClass[]>(this.urlcon + "Job/AllJobs", this.header).pipe();
  }
  PostJob(Job: JobClass) {
    return this.http.post<JobClass>(this.urlcon + "Job/AddJob", Job, this.header).pipe();
  }
  UpdateJob(Job: JobClass) {
    return this.http.put<JobClass>(this.urlcon + "Job/UpdateJob", Job, this.header).pipe();
  }
  DeleteJob(id: number) {
    return this.http.delete<JobClass>(this.urlcon + "Job/DeleteJob/" + id, this.header).pipe();
  }
}
