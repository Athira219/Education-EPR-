import { Component, OnInit } from '@angular/core';
import { ServiceapiService } from '../service/serviceapi.service';
import { studentModel } from '../studentModel';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private serviceApi: ServiceapiService) { }

  allStudents: studentModel[] = []
  searchkey: string = ""

  /* for pagination */
  p: number = 1;


  ngOnInit(): void {
    this.allStudentDetails()
  }

  allStudentDetails() {
    this.serviceApi.getAllStudent().subscribe({
      next: (res: any) => {
        this.allStudents = res
        console.log('allStudents=', this.allStudents);

      },
      error: (err: any) => {
        console.log(err);


      }
    })

  }

  deleteStudentDetails(id: any) {
    this.serviceApi.deleteStudent(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allStudentDetails()


      },
      error: (err: any) => {
        console.log(err);


      }
    })

  }

  sortId() {
    this.allStudents.sort((a: any, b: any) => a.id - b.id)
  }
  sortName() {
    this.allStudents.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }
  generatePdf() {
    /*     create a object for pdf */
    const pdf = new jsPDF()

    let head= [['ID', 'Student Name', 'Email', 'Status']]
    let body: any = []
    this.allStudents.forEach((items: any) => {
      body.push([items.id, items.name, items.email, items.status])
    })

    /* font size */
    pdf.setFontSize(16)
    /* title */
    pdf.text('Student Details', 10, 10)
    /* table */
    // autoTable(pdf,{ head, body })
    autoTable(pdf,{head,body})

    /* to open in a new tab */
    pdf.output('dataurlnewwindow')
    /* save & download */
    pdf.save('student.pdf')

  }

}
