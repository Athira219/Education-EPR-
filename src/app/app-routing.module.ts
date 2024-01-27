import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { authGuard } from './gurds/auth.guard';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"dashboard" , component:DashboardComponent,canActivate:[authGuard]},
  {path:"student-list" , component:StudentListComponent,canActivate:[authGuard]},
  {path:"student-create" , component:StudentCreateComponent},
  {path:"student-edit/:id" ,component:StudentEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
