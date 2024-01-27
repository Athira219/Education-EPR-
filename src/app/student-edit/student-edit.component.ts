import { Component, OnInit } from '@angular/core';
import { studentModel } from '../studentModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceapiService } from '../service/serviceapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  student : studentModel={}

  constructor(private route:ActivatedRoute,private service:ServiceapiService,private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
      // console.log('id=',id);
      this.studentDetail(id)
      

    })
  }
  
  studentDetail(id:any){
    this.service.viewStudent(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.student=res
        
      },
      error:(err:any)=>{
        console.log(err);
        

      }
    })
  }
    /* update student function  */
  editStudent(id:any){
    this.service.updateStudent(id,this.student).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "wow...",
          text: "Successfully Updated  ",
  
        });

        this.router.navigateByUrl('/student-list')

      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  cancel(id:any){
    this.studentDetail(id)

  }

}
