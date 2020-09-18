import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {from, interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, filter, finalize, map, retryWhen, share, shareReplay, tap} from 'rxjs/operators';

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
        // by putting the finalize and catchError before the shareReplay operator,
        // we ensure that the finalize code and error code is executed once, regardless
        // of how many subscribers there are
        catchError((err) => {
          console.log("error occurred", err);
          return throwError(err);
        }),
        finalize(() => {
          console.info('finalize executed...');
        }),
        tap(() => console.log('http request executed')),
        map((response) => response.payload),
        shareReplay()
      );

      this.beginnerCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(c => c.category === 'BEGINNER'))
      );

      this.advancedCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(c => c.category === 'ADVANCED'))
      );

    }

}
