import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../services/faculty.service';
import { Faculty } from '../models/faculty';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {

  public faculties: Faculty[] = [];
  public newFacultyName: string = '';

  constructor(private facultyService: FacultyService, private router: Router) {}

  ngOnInit(){
    this.getAllFaculties();
  }

  public getAllFaculties(): void {
    this.facultyService.getAllFaculties().subscribe(
      (Response: Faculty[])=> {
        this.faculties = Response
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
    };


  addFaculty(): void {
    if (!this.newFacultyName.trim()) return;

    const newFaculty: Faculty = { facultyName: this.newFacultyName };
    this.facultyService.addFaculty(newFaculty).subscribe({
      next: (faculty) => {
        this.faculties.push(faculty);
        this.newFacultyName = '';
      },
      error: (err) => console.error('Error adding faculty:', err)
    });
  }

deleteFaculty(id: number): void {
  this.facultyService.deleteFaculty(id).subscribe(() => {
    this.getAllFaculties();
  });
}

// auth
isLoggedIn(): boolean {
  return !!localStorage.getItem('authToken');
}

// courses from faculty id

viewCoursesByFaculty(id: number): void {
  this.router.navigate(['/courses/faculty', id]);
}

}
