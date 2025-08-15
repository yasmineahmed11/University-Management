import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiServerUrl}/students`);
  }

    public addStudents(student: Student): Observable<Student[]>{
    return this.http.post<Student[]>(`${this.apiServerUrl}/students`, student);
  }
    public updateStudents(student: Student, studentId: number): Observable<Student[]>{
    return this.http.put<Student[]>(`${this.apiServerUrl}/students/${studentId}`, student);
  }
    public deleteStudents(studentId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/students/${studentId}`);
  }

}
