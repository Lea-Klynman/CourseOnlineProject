import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/api/courses';
 courses$ !:Observable<Course[]>
  constructor(private http: HttpClient) { }

  // GET all courses
  getCourses(): Observable<Course[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    console.log(headers);
    
    this.courses$= this.http.get<Course[]>(this.apiUrl,{ headers });
     return this.courses$
  }

  // GET course by ID
  getCourse(id: number): Observable<Course> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<Course>(`${this.apiUrl}/${id}`,{ headers });
  }

  // POST create new course (for teachers)
  createCourse(course: Course): Observable<Course> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.post<Course>(this.apiUrl, course, { headers });
  }

  // PUT update course by ID (for teachers)
  updateCourse(course: Course): Observable<Course> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course, { headers });
  }

  // DELETE course by ID (for teachers)
  deleteCourse(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }


  enroll(courseId: number,userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, userId, { headers });
  }
}