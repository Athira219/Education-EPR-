import { Component, OnInit } from '@angular/core';
import { ServiceapiService } from '../service/serviceapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showSideBar: boolean = true
  studentCount = 0
  selected: Date | null = new Date();
  profileImage: string = './assets/Images/users.png'
  editStatus: boolean = false
  adminName: any = ''
  adminDetails:any={}


  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};



  constructor(private service: ServiceapiService) {
    this.chartOptions = {

      chart: {
        type: 'pie'
      },
      title: {
        text: 'Number of Students'
      },
      tooltip: {
        valueSuffix: '%'
      },

      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'students',
          colorByPoint: true,
          data: [
            {
              name: 'Science ',
              y: 55.02
            },
            {
              name: 'Electronic ',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'Humanities ',
              y: 1.09
            },
            {
              name: 'IT',
              y: 15.5
            },
            {
              name: 'Commerce ',
              y: 1.68
            }
          ]
        }
      ]

    }
    HC_exporting(Highcharts);

  }
  ngOnInit(): void {
    this.totalStudent()

    if (localStorage.getItem('name')) {
      this.adminName = localStorage.getItem('name')
    }

    /* fetch all student details */
    this.service.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.profileImage=res.picture
      }

      
    })
  }

  menuBar() {
    this.showSideBar = !this.showSideBar
  }

  /* total students */
  totalStudent() {
    this.service.getAllStudent().subscribe({
      next: (res: any) => {
        this.studentCount = res.length

      },
      error: (err: any) => {
        console.log(err);


      }
    })
  }

  ChangeAdmin() {
    this.editStatus = true
  }
  getProfile(event:any){

    let profileDetails = event.target.files[0]
    console.log(profileDetails);

    /* create an object for fileReader class */

    let profilePhoto = new FileReader()

    /* read */
    profilePhoto.readAsDataURL(profileDetails)

    /* convert */
    profilePhoto.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage=event.target.result
      
      this.adminDetails.picture = this.profileImage
    }
    
    

  }
  editAdmin(){
    this.service.updateAdmin(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "wow...",
          text: "login successfull",

        });
        localStorage.setItem("name",res.name)
        localStorage.setItem("password",res.password)
        this.adminName=localStorage.getItem("name")

      },
      error:(err:any)=>{
        console.log(err);

      }
      
    })
  }
  cancel(){
    this.service.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.profileImage=res.picture
      }
      this.editStatus=false

      
    })

  }

}
