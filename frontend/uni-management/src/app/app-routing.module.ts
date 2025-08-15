import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AuthGuard } from './ath.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faculties', component: FacultyListComponent, canActivate: [AuthGuard] },
  { path: 'courses/faculty/:facultyId', component: CourseListComponent },
  { path: 'courses', component: CourseListComponent },
  {path: 'students',component: StudentListComponent,canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
