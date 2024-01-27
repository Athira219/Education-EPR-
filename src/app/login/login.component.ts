import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceapiService } from '../service/serviceapi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = ""

  constructor(private api: ServiceapiService, private router: Router) {

  }

  login() {
    if (!this.email || !this.password) {
      // alert('Fill the Form')
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Fill the Form",

      });

    } else {

      this.api.authorization().subscribe({
        next: (res: any) => {
          const { email, password } = res
          if (email === this.email && password === this.password) {
            Swal.fire({
              icon: "success",
              title: "wow...",
              text: "login successfull",

            });
            this.api.updatedData({value:true})
            
            localStorage.setItem("name",res.name)
            localStorage.setItem("password",res.password)
            //navigate
            this.router.navigateByUrl('dashboard')

          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "invalid Email or Password",

            });
          }
        }
      })
      // alert('success')


    }
  }





}
