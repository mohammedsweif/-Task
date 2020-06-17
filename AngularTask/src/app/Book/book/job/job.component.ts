import { Component, OnInit } from '@angular/core';
import { JobservService } from '../../_service/jobserv.service';
import JobClass from '../../_Model/Job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
/********************************************* */
alljobs:JobClass[]=[];
onejob:JobClass=new JobClass(0,null);
newJob:JobClass=new JobClass(0,null);
config:any;
/********************************************* */
  constructor(public serv:JobservService) { 
    this.config = {
      itemsPerPage: 3,
      currentPage: 1
    }
  }

  ngOnInit(): void {
    this.onejob=new JobClass(0,"");
    this.getalljobs();
  }
  /******************************************** */
getalljobs(){
    this.serv.GetAllJobs().subscribe(a=>{this.alljobs=a;console.log(a)})
} 
addjob(){ 
  var check=this.alljobs.filter(a=>a.jobtitle.toLowerCase() == this.newJob.jobtitle.toLowerCase()  ).length; 
if(check != 0){
  alert("you cannot add this jobtitle it is stored before");
}

else{
 this.serv.PostJob(this.newJob).subscribe(e=>{this.newJob=new JobClass(0,"");this.getalljobs();})
}

}
showupdate(item:JobClass){
this.onejob= new JobClass(item.id,item.jobtitle) 
}
updatejob(){
    var check=this.alljobs.filter(a=>a.jobtitle.toLowerCase()  == this.onejob.jobtitle.toLowerCase()  ).length; 
  if(check != 0){
    alert("you cannot add this jobtitle it is stored before");
  }else{
   
  this.serv.UpdateJob(this.onejob).subscribe(e=>{console.log(e);this.getalljobs()})}
}
deletejob(item:JobClass){
  
  this.serv.DeleteJob(item.id).subscribe(e=>this.getalljobs())}

/*************************************************************** */
pageChanged(event){
  this.config.currentPage = event;
 }
}



