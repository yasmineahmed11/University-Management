import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  pagedStudents: Student[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.totalPages = Math.ceil(this.students.length / this.pageSize);
        this.setPagedStudents();
      },
      error: (err) => {
        console.error('Failed to load students', err);
      }
    });
  }

  setPagedStudents(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedStudents = this.students.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.setPagedStudents();
  }

    nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPagedStudents();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedStudents();
    }
  }

  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudents(studentId).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.studentId !== studentId);this.totalPages = Math.ceil(this.students.length / this.pageSize);
          if(this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
          }
          this.setPagedStudents();
        },
        error: (err) => {
          console.error('Failed to delete student', err);
        }
      });
    }
  }

  editStudent(student: Student): void {
    console.log('Edit student:', student);
  }

  viewStudent(student: Student): void {
    console.log('View student:', student);
  }
}
