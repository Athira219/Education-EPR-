import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentModel } from '../studentModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceapiService {

  constructor(private http:HttpClient) { }

  server_url = "https://education-erp-backend.onrender.com"

  /* create an object for the behavior subject */
  public sharedData = new BehaviorSubject(false)
  /* next=> to access the new value */
  updatedData(data:any){
    this.sharedData.next(data)
  }


authorization(){
  return this.http.get(`${this.server_url}/students/1`)
}
createStudent(student:studentModel){
  return this.http.post(`${this.server_url}/students`,student)
}
getAllStudent(){
 return this.http.get(`${this.server_url}/students`)
}
deleteStudent(id:any){
  return this.http.delete(`${this.server_url}/students/${id}`)
}
viewStudent(id:any){
return this.http.get(`${this.server_url}/students/${id}`)
}
updateStudent(id:any,student:any){
  return this.http.put(`${this.server_url}/students/${id}`,student)
}
updateAdmin(user:any){
 return this.http.put(`${this.server_url}/students/1`,user)
}
}
