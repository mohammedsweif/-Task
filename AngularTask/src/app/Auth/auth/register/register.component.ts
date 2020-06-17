import { Component, OnInit } from '@angular/core';
import { AuthservService } from '../../_service/authserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registerr } from '../../_Models/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   
   constructor(private fb:FormBuilder,private ser:AuthservService) { }
   userForm:FormGroup;
   massageValidator={
    UserName:{
      required:"this fild must be enter",
      minLength:"you should enter at least 15 char",
      maxlength:"you should enter less than 150 char"
    },
    
      Email:{
        required:"this fild must be enter and be email",
        pattern:"this fild must be enter Like sw@gggg.com "
    
    
      },
    
    Password:{
      required:"this fild must be enter",
      minLength:"you should enter at least 6"
  
  
    },
    ConfirmPassword:{
      required:"this fild must be enter",
      minLength:"you should enter at least 6"
  
    } }
    /****************************************************** */
   message:string;
   success="please check your Email now to confirm";
   regist:Registerr;
   register(){
     
  if(this.userForm.valid){
    this.completeregisterobject();
  this.ser.register(this.regist).subscribe(success =>{
    
    this.message =String(this.success);
    console.log(this.message ,this.success);
  
    this.userForm.reset();
  },err=>{
    this.message =err.error;
    
  });
  if(this.message == ""){
    this.message =String(this.success);
  }
  }else{
    alert("no there is an error in your data ");
  }
  
  }
  /******************************************************** */
  completeregisterobject(){
    this.regist.UserName = this.userForm.value.UserName;
    this.regist.Email = this.userForm.value.Email;
    this.regist.Password = this.userForm.value.Password;
    this.regist.ConfirmPassword = this.userForm.value.ConfirmPassword;
  }
  checkpassandconfirm(){
    if(this.userForm.value.Password !== '' && this.userForm.value.ConfirmPassword !== '')
    {if(this.userForm.value.Password !== this.userForm.value.ConfirmPassword)
        { return false;}}
    return true;
  }
  /*********************************************************************** */
  
    ngOnInit(): void {
  
     this. message='';
     this. regist={
        UserName:"",
        Email:"",
        Password:"",
        ConfirmPassword:""
      }
      this.userForm=this.fb.group({
      UserName:["",[Validators.required,Validators.minLength(10),Validators.maxLength(150)]],
      Email:["",[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password:["",[Validators.required,Validators.minLength(6)]],
      ConfirmPassword:["",[Validators.required,Validators.minLength(6)]],
      
  
      });
      
    }

}
