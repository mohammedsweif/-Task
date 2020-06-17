import { Component, OnInit } from '@angular/core';
import { DepartmentservService } from '../../_service/departmentserv.service';
import DepartmentClass from '../../_Model/Department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
/*********************************** */
alldepartments:DepartmentClass[]=[];
onedepart:DepartmentClass=new DepartmentClass(0,null);
newDep:DepartmentClass=new DepartmentClass(0,null);
config:any;
/********************************** */
  constructor(public serv:DepartmentservService) { 
    this.config = {
      itemsPerPage: 2,
      currentPage: 1
    }
  }

  ngOnInit(): void {
    this.onedepart=new DepartmentClass(0,"");
    this.getall();
  }
  /******************************************* */
  getall(){
    this.serv.GetAllDepartments().subscribe(a=>this.alldepartments = a)
  }

  addDepartment(){
   
var check=this.alldepartments.filter(a=>a.depName.toLowerCase()  ==  this.newDep.depName.toLowerCase()  ).length; 

if(check != 0){
  alert("you cannot add this department it is stored before");
}

else{
  this.serv.PostDepartment(this.newDep).subscribe(e=>{this.newDep=new DepartmentClass(0,"");this.getall();})
}
  }
  showupdate(item:DepartmentClass){
    this.onedepart=new DepartmentClass(item.id,item.depName);
  }
  updatedep(){
    var check=this.alldepartments.filter(a=>a.depName.toLowerCase()  == this.onedepart.depName.toLowerCase()  ).length; 
if(check != 0){
  alert("you cannot add this department it is stored before");
}else{
  alert("done");
    this.serv.UpdateDepartment(this.onedepart).subscribe(e=>{this.onedepart=new DepartmentClass(0,"");this.getall()})
  }
}
  deletedep(item:DepartmentClass){
    
    this.serv.DeleteDepartment(item.id).subscribe(e=>this.getall())
   
  }

  pageChanged(event){
    this.config.currentPage = event;
   }
}
