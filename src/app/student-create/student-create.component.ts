import { Component } from '@angular/core';
import { studentModel } from '../studentModel';
import { ServiceapiService } from '../service/serviceapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {

  constructor(private service:ServiceapiService){}

   /* variable to store the value from the input box which have the same structure of emoplyeeModel */
  student : studentModel={}

  cancel(){
    this.student={}
  }
  addStudent(){
    console.log('student=',this.student);
    if(!this.student.id || !this.student.name ||!this.student.email || !this.student.status){
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Please fill the form ",

      });
    }else{
      this.service.createStudent(this.student).subscribe({
        next:(res:studentModel)=>{
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "wow...",
            text: "Successfully Created a new student ",
  
          });
          this.student={}
          
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed",
  
          });
          
        }
      })

    }
    
    
  }

}
