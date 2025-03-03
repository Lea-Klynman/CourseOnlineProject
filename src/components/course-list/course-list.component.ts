import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
courses$ :Observable<Course[]>;
  router = inject(Router);

constructor(private coursesService: CourseService,private authService: AuthService){
this.courses$ = this.coursesService.getCourses(); 
}


public getAuthServiceRole(): string {
  return this.authService.role;
}


enroll(course: Course){
  this.coursesService.enroll(course.id,this.authService.userId).subscribe({
    next: () => {
      this.courses$ = this.coursesService.getCourses();
      console.log("enroll successful");
      
    },
    error: () => {
      console.log("enroll failed");
    }
  });
}

update(course: Course){
  this.router.navigate(['/update-course', course.id]);
}

delete(id: number){
  this.coursesService.deleteCourse(id).subscribe({
    next: () => {
      this.courses$ = this.coursesService.getCourses();
      console.log("delete successful");
      
    },
    error: () => {
      console.log("delete failed");
    }
  })
}

add(){
  const userId = this.authService.userId;
  this.router.navigate(['/add-course', userId]);
}

}
