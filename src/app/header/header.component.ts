import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceapiService } from '../service/serviceapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged:boolean=false

  constructor(private router:Router ,private service:ServiceapiService) {
    this.service.sharedData.subscribe((data:any)=>{
      this.logged=data
    })
  }

  logOut(){
    localStorage.removeItem('name')
    localStorage.removeItem('password')
    this.logged=false
    this.router.navigateByUrl("")

  }

}
