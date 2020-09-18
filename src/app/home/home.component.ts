import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {from, interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, filter, map, retryWhen, share, shareReplay, tap} from 'rxjs/operators';

import {createHttpObservable} from '../common/util'
import { APP_API } from 'app/constants/api';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public beginnerCourses$: Observable<Course[]> = from([]);
  public advancedCourses$: Observable<Course[]> = from([]);

    constructor() { }

    ngOnInit() {
      const http$ = createHttpObservable(APP_API.GET_COURSES);
      const courses$ = http$.pipe(
        tap(() => console.log('http request executed')),
        map((response) => response.payload),
        shareReplay(),
        catchError((err) => of([
          {
            id: 0,
            description: "RxJs In Practice Course",
            iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
            courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
            longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
            category: 'BEGINNER',
            lessonsCount: 10
          }
        ]))
      );

      this.beginnerCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(c => c.category === 'BEGINNER'))
      );

      this.advancedCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(c => c.category === 'ADVANCED'))
      );

    }

}
