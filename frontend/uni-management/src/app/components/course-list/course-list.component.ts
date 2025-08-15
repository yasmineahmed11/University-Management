import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls:['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public courses: Course[] = [];
  public selectedCourse: Course | null = null;

  public currentPage: number = 1;         // 1-based for display
  public pageSize: number = 5;            // matches <p-paginator rows>
  public totalItems: number = 0;          // from backend

//   public pagedCourses: Course[] = [];
//   public currentPage: number = 1;
// public pageSize: number = 5;
// public totalPages = 0;



  constructor(private courseService: CourseService, private route: ActivatedRoute) {}


  ngOnInit() : void {

    const facultyId = this.route.snapshot.paramMap.get('facultyId');
  if (facultyId) {
    this.getCoursesByFaculty(+facultyId); // mn string l number
  } else {
    this.getCoursesPaginated(); // default behavior
  }
  }

  // public getAllCourses() : void{
  //   this.courseService.getAllCourses().subscribe(
  //     (Response: Course[])=>{
  //       this.courses = Response
  //     },
  //     (error: HttpErrorResponse)=>{
  //       alert(error.message)
  //     }
  //   )
  // }

  public getCoursesByFaculty(facultyId):void{
    this.courseService.getCoursesByFaculty(facultyId).subscribe(
      (Response: Course[]) =>{
        this.courses = Response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  // update

public updateCourse(): void {
  if (this.selectedCourse) {
    this.courseService.updateCourse(this.selectedCourse).subscribe({
      next: (updatedCourse) => {
        // Refresh the course list
        this.getCoursesPaginated();

        // Close modal
        const modal = document.getElementById('editModal');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance?.hide();
        }

        this.selectedCourse = null;
      },
      error: (error: HttpErrorResponse) => {
        alert('Error updating course: ' + error.message);
      }
    });
  }
}


  openEditModal(course: Course): void {
  this.selectedCourse = { ...course };
  const modal = document.getElementById('editModal');
  if (modal) {
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }
}

// pagination


// getCoursesPaginated(): void {
//   this.courseService.getAllCourses().subscribe({
//     next: (response) => {
//       this.courses = response;
//       this.totalPages = Math.ceil(this.courses.length / this.pageSize);
//       this.setPagedCourses();
//     },
//     error: (err) => {
//       console.error('Failed to load courses', err);
//     }
//   });
// }


  //   setPagedCourses(): void {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.pagedCourses = this.courses.slice(startIndex, endIndex);
  // }

//   goToPage(page: number): void {
//   if (page < 1 || page > this.totalPages) return;
//   this.currentPage = page;
//   this.getCoursesPaginated();
// }

// nextPage(): void {
//   if (this.currentPage < this.totalPages) {
//     this.currentPage++;
//     this.getCoursesPaginated();
//   }
// }

// prevPage(): void {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//     this.getCoursesPaginated();
//   }
// }


  // auth
isLoggedIn(): boolean {
  return !!localStorage.getItem('authToken');
}

getCoursesPaginated(page: number = 0): void {
  this.courseService.getPaginatedCourses(page, this.pageSize).subscribe({
    next: (response) => {
      this.courses = response.courses;
      this.totalItems = response.totalItems;
      this.currentPage = response.currentPage + 1; // converting 0-based to 1-based
    },
    error: (error) => {
      console.error('Error fetching paginated courses', error);
    }
  });
}

paginate(event: any): void {
  const page = event.page; // 0-based index
  this.getCoursesPaginated(page);
}


// getCoursesPaginated(): void {
//   this.courseService.getPaginatedCourses(this.currentPage - 1, this.pageSize).subscribe({
//     next: (response) => {
//       this.courses = response.courses;
//       this.totalPages = response.totalPages;
//     },
//     error: (err) => {
//       console.error('Failed to load courses', err);
//     }
//   });
// }



// getCoursesPaginated(): void {
//   this.courseService.getPaginatedCourses(this.currentPage, this.pageSize).subscribe(
//     (response: any) => {
//       this.courses = response.content;
//       this.totalPages = response.totalPages;
//     },
//     (error: HttpErrorResponse) => {
//       alert(error.message);
//     }
//   );
// }


// nextPage(): void {
//   this.currentPage++;
//   this.getCoursesPaginated();
// }

// prevPage(): void {
//   if (this.currentPage > 0) {
//     this.currentPage--;
//     this.getCoursesPaginated();
//   }
// }


}
