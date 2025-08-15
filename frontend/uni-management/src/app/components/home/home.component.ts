import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FacultyService } from '../../services/faculty.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalStudents = 0;
  totalFaculties = 0;
  totalCourses = 0;

  constructor(
    private studentService: StudentService,
    private facultyService: FacultyService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.studentService.getStudents().subscribe(students => {
      this.totalStudents = students.length;
    });
    this.facultyService.getAllFaculties().subscribe(faculties => {
      this.totalFaculties = faculties.length;
    });
    this.courseService.getAllCourses().subscribe(courses => {
      this.totalCourses = courses.length;
    });
  }
}
