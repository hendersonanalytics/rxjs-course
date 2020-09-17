import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {from, interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, filter, map, retryWhen, shareReplay, tap} from 'rxjs/operators';

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

    constructor() {

    }

    ngOnInit() {
      const http$ = createHttpObservable(APP_API.GET_COURSES);
      const courses$ = http$.pipe(map((response) => response.payload));

      this.beginnerCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(c => c.category === 'BEGINNER'))
      );

      this.advancedCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(c => c.category === 'ADVANCED'))
      );

    }

}
