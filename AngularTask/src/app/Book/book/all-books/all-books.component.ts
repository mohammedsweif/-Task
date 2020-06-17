import { Component, OnInit } from '@angular/core';
import { BookservService } from '../../_service/bookserv.service';
import BookViewModel from '../../_Model/BookViewModel';
import BookClass from '../../_Model/Book';
import { DepartmentservService } from '../../_service/departmentserv.service';
import { JobservService } from '../../_service/jobserv.service';
import DepartmentClass from '../../_Model/Department';
import JobClass from '../../_Model/Job';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
/***************************************************** */
allbooks:BookViewModel[]=[];
onebook:BookClass=new BookClass(0,"",0,0,"",null,"","","");
newBook:BookClass=new BookClass(0,"",0,0,"",null,"","","");
alldepartments:DepartmentClass[]=[];
alljobs:JobClass[]=[];
jobNo:number=0;
depNo:number=0;
config:any;
/***************************************************** */  
  constructor(private fb:FormBuilder,public ser:BookservService,public servdep:DepartmentservService,public servjob:JobservService) {
    this.config = {
      itemsPerPage: 2,
      currentPage: 1
    }

   }
 /****************************************************************** */
 userForm:FormGroup;
 massageValidator={
  UserName:{
    required:"this field must be enter",
    minLength:"you should enter at least 15 char",
    maxlength:"you should enter less than 150 char"
  },
  Address:{
    required:"this field must be enter",
    minLength:"you should enter at least 15 char",
    maxlength:"you should enter less than 150 char"
  },
  Email:{
    required:"this field must be enter and be email",
    pattern:"this field must be enter Like sw@gggg.com "


  },
  Mobile:{
    required:"this fild must be enter",
    minLength:"must enter 10 number  without first 0",
    maxlength:"must enter 10 number without first 0",
    pattern:"must enter number like 1234567890"
  } ,
  date:{
    required:"this fild must be enter"
  }
}
  /***************************************** */
  

  completeregisterobjectEdit(){
    
    this.onebook =new BookClass(0,this.userForm.value.UserName,this.onebook.jobtitle,this.onebook.departmentId,this.userForm.value.Mobile,this.userForm.value.date,this.userForm.value.Address,this.userForm.value.Email,this.ImageUrl);
   console.log(this.onebook);
   
  }
  /************************************** */
  completeregisterobjectAdd(){
   console.log(this.newBook.jobtitle,this.newBook.departmentId);
    this.newBook =new BookClass(0,this.userForm.value.UserName,this.newBook.jobtitle,this.newBook.departmentId,this.userForm.value.Mobile,this.userForm.value.date,this.userForm.value.Address,this.userForm.value.Email,this.ImageUrl);
   console.log(this.newBook);
   
  }
  notallow:boolean=false;
  registerAdd(){
    this.completeregisterobjectAdd();
    if(this.newBook.jobtitle==0||this.newBook.departmentId ==0){
      this.notallow=false;
    }else{
      this.notallow=true;
      this.addbook();
    }
   
 }

 registerEdit(){
 // this.onebook.photo=this.ImageUrl;
  
  this.onebook.photo=this.ImageUrl
  if(this.jobNo != 0){
  console.log(this.onebook.jobtitle)

  this.onebook.jobtitle=this.jobNo;
  console.log(this.jobNo,this.onebook.jobtitle)

 }
 if(this.depNo !=0 ){
  this.onebook.departmentId=this.depNo;
 }
   console.log(this.onebook);
   
  this.ser.UpdateBook(this.onebook).subscribe(a=>{ this.onebook=new BookClass(0,"",0,0,"",null,"","",""); this.getall();});
 
 }
candownload(){
  if(this.allbooks.length > 0)
      return true;
  return false;
}
 
 /******************************************************************* */
 datefrom:Date;
 dateto:Date;
 searchvalue:string;
 search(f){
  this.searchvalue=f.value;
  console.log(this.searchvalue);

 }
 searchfrom(fr){
  if(new Date(fr.value) > new Date(this.dateto)){ alert("sorry from is after to so bad search")
  this.datefrom=new Date("1900/1/1");
}
  else{
    this.datefrom=fr.value;
  }

 
  
   console.log(this.datefrom);
 }
 searchto(to){
if(new Date(to.value)<new Date(this.datefrom)){ alert("sorry from is after to so bad search")
this.dateto=new Date("2100/1/1");

}
else{
this.dateto= to.value;
}
console.log(this.dateto); 
}
 /******************************************************************* */
 ImageUrl:string="";
fileInfo:File=null;




  ngOnInit(): void {
    this.datefrom=new Date("1900/1/1");
    this.dateto=new Date("2100/1/1");
    this.searchvalue='';

    this.getall();
    this.getalljobs();
    this.getalldepartments();
    this.onebook=new BookClass(0,"",0,0,"",null,"","","");
    this.userForm=this.fb.group({
      UserName:["",[Validators.required,Validators.minLength(10),Validators.maxLength(150)]],
      Address:["",[Validators.required,Validators.minLength(10),Validators.maxLength(150)]],
      Email:["",[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Mobile:["",[Validators.required,Validators.minLength(10),Validators.maxLength(11),Validators.pattern("[0-9 ]{10}")]],
      date:["",[Validators.required]],
      

      });


      
  }
  handleFileInput(file:FileList){
    this.fileInfo=file.item(0);
    console.log(file);
    console.log(this.fileInfo);
    var reader= new FileReader();
    reader.onload=(event:any)=>{
      console.log(event);
      this.ImageUrl= event.target.result;
      console.log(this.ImageUrl);
    }
    reader.readAsDataURL(this.fileInfo);
    }
  
getalljobs(){
    this.servjob.GetAllJobs().subscribe(a=>this.alljobs=a)
} 
getalldepartments(){
  this.servdep.GetAllDepartments().subscribe(a=>this.alldepartments=a)
}
getall(){
  this.ser.GetAllBooks().subscribe(a=>{this.allbooks=a;console.log(a,this.allbooks)})
 
}
addbook(){
  this.ser.PostBook(this.newBook).subscribe(a=>{ this.newBook=new BookClass(0,"",0,0,"",null,"","",""); this.getall();});
}
 
showupdate(item:any){
   console.log( this.onebook);
  console.log(item);
  this.onebook=new BookClass(item.id,item.fullName,item.jobtitle.id,item.depName.id,item.mobile,item.birthDate,item.address,item.email,item.photo);
  console.log( this.onebook);
 
 
}
updatebook(){
}
deleteitem:number=0;
deletebook(item:number){
  this.deleteitem=item;
 console.log(this.deleteitem)

 // 
}
delete(){
  this.ser.DeleteBook(this.deleteitem).subscribe(a=> this.getall());
}
download(){
  this.ser.DownloadExel().subscribe(a=>a,err=>alert("there is an error")); 
}



changeJobAdd(value:number){
  console.log(value);
  this.jobNo=value;
  this.newBook.jobtitle =this.jobNo;
  if(this.newBook.jobtitle==0||this.newBook.departmentId ==0){
    this.notallow=false;
  }else{
    this.notallow=true;}
  }

  changeDepAdd(value:number){
    console.log(value);
    this.depNo=value;
    this.newBook.departmentId =this.depNo;
    if(this.newBook.jobtitle==0||this.newBook.departmentId ==0){
      this.notallow=false;
    }else{
      this.notallow=true;}
    }

    changeJobEdit(value:number){
      console.log(value);
      this.jobNo=value;
      this.onebook.jobtitle =this.jobNo;
      }
    
      changeDepEdit(value:number){
        console.log(value);
        this.depNo=value;
        this.onebook.departmentId =this.depNo;
        }


    pageChanged(event){
      this.config.currentPage = event;
     }

}
