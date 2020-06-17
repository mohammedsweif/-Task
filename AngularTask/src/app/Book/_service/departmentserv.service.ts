import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DepartmentClass from '../_Model/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentservService {


  constructor(public http: HttpClient) { }
  urlcon: string = "http://localhost:50565/";
  header = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  header2 = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem("token")
    })
  }

  /*************************************************************** */
  GetAllDepartments() {
    return this.http.get<DepartmentClass[]>(this.urlcon + "Department/AllDepartments", this.header).pipe();
  }
  PostDepartment(Department: DepartmentClass) {
    return this.http.post<DepartmentClass>(this.urlcon + "Department/AddDepartment", Department, this.header).pipe();
  }
  UpdateDepartment(Department: DepartmentClass) {
    return this.http.put<DepartmentClass>(this.urlcon + "Department/UpdateDepartment", Department, this.header).pipe();
  }
  DeleteDepartment(id: number) {
    return this.http.delete<DepartmentClass>(this.urlcon + "Department/DeleteDepartment/" + id, this.header).pipe();
  }
}
