import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';

import {createHttpObservable} from '../common/util'
import { APP_API } from 'app/constants/api';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public beginnerCourses: Course[] = [];
  public advancedCourses: Course[] = [];

    constructor() {

    }

    ngOnInit() {
      const http$ = createHttpObservable(APP_API.GET_COURSES);

      const courses$ = http$.pipe(
        map((response) => response.payload)
      );

      courses$.subscribe(
        (courses: Course[]) => {
          this.beginnerCourses = courses.filter(c => c.category === 'BEGINNER');
          this.advancedCourses = courses.filter(c => c.category === 'ADVANCED');        },
        noop,
        () => console.log('completed')
      );

    }

}
