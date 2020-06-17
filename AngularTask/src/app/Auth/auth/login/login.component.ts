import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormBuilder, Validators} from "@angular/forms"; 
import { Router } from '@angular/router';
import loginClass from '../../_Models/LoginClass';
import { AuthservService } from '../../_service/authserv.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform:FormGroup;
  constructor(private formBuilder: FormBuilder,private ser:AuthservService,private route:Router) {
  
  }
 
  logs:loginClass;
  message:string;
login(){
  

  if(this.checkbeforelogin()){
  this.ser.login(this.logs).subscribe(success=>{
    
    localStorage.setItem("token", (success["token"]));
    localStorage.setItem("username", (success["username"]));
    localStorage.setItem("id", (success["id"]));
    
this.route.navigate(["/Book"]);

  },er=>{
    this.message=er.error;
       
      console.log(this.message);
 
  });}
  else{
    alert("please enter good data");
  }
 }
 checkbeforelogin(){
  
   if(this.userform.valid){
     this.logs.Email=this.userform.value.Email
     this.logs.Password=this.userform.value.Password;
     this.logs.RemmberMe=this.userform.value.rememberMe;
return true;
   }
return false;
 }
  ngOnInit(): void {
    this.message='';
    this.logs={
     Email:"",
     Password:"",
      RemmberMe:false
    }
    this.userform = this.formBuilder.group({
      Email: ['',[Validators.required,Validators.email]],
      Password: ['',[Validators.required,Validators.minLength(6)]],
      rememberMe:false
    });

  }


}
