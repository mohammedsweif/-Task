import { Component, OnInit } from '@angular/core';
import { AuthservService } from '../Auth/_service/authserv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private ser:AuthservService,private route:Router) { }
  username:string;
  logout(){
this.ser.logout().subscribe(e=>{
  localStorage.removeItem("token");
  localStorage.removeItem("username");
 
  localStorage.removeItem("id");
  this.route.navigate(["/Auth"]);
});
    
    
  }

  check():boolean{
    if(localStorage.getItem("token") != null){
      this.username=localStorage.getItem("username");
      
      return true;
    }
   
    return false;
  }
 



  ngOnInit(): void {
  }

}
