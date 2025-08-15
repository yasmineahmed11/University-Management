import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faculty } from '../models/faculty';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`${this.apiServerUrl}/faculties`);
  }

  public addFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(`${this.apiServerUrl}/faculties`, faculty);
  }

    public deleteFaculty(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/faculties/${id}`);
  }


  // getFacultyById(id: number): Observable<Faculty> {
  //   return this.http.get<Faculty>(`${this.baseUrl}/${id}`);
  // }


}
