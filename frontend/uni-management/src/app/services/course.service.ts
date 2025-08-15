import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Faculty } from './../models/faculty';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  public getCoursesByFaculty(facultyId: number) : Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/courses/faculty/${facultyId}`);
  }

  public getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/courses`);
  }

  public updateCourse(course: Course): Observable<Course> {
  return this.http.put<Course>(`${this.apiServerUrl}/courses/${course.courseId}`, course);
}

// pagination
// public getPaginatedCourses(): Observable<any> {
//   return this.http.get<Course[]>(`${this.apiServerUrl}/courses`);
// }


getPaginatedCourses(page: number, size: number) {
  return this.http.get<any>(`${this.apiServerUrl}/courses`, {
    params: {
      page: page.toString(),
      size: size.toString()
    }
  });
}




  // getCoursesByFaculty(facultyId: number): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.apiServerUrl}/faculty/${facultyId}`);
  // }

  // getAllCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.apiServerUrl}`);
  // }
}
