import { Injectable } from '@angular/core'
import { Course } from 'app/model/course'
import { BehaviorSubject, from, Observable, of, timer } from 'rxjs'
import { fromPromise } from 'rxjs/internal-compatibility';
import { delayWhen, filter, map, retryWhen, shareReplay, take, tap } from 'rxjs/operators';
import { createHttpObservable } from './util';

@Injectable({
  providedIn: 'root'
})
export class Store {
  private _subject = new BehaviorSubject<Course[]>([]);
  public courses$ = this._subject.asObservable();

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  init() {
    const http$ = createHttpObservable('/api/courses');
    http$.pipe(
      tap(() => {
        console.log("HTTP request executed");
      }),
      map(res => Object.values(res["payload"]))
    ).subscribe((courses: Course[]) => {
      this._subject.next(courses);
    });
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED');
  }

  selectCourseById(courseId: number) {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === courseId)),
      filter((course) => !!course),
    );
  }

  private async _saveCourse(courseId: number, changes: Partial<Course>) {
    return fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: { 'content-type': 'application/json' }
    });
  }

  saveCourse(courseId: number, changes: Partial<Course>) {
    const courses = this._subject.getValue();
    const courseIndex = courses.findIndex(el => el.id === courseId);
    const newCourses = courses.slice(0);
    newCourses[courseIndex] = { ...courses[courseIndex], ...changes };
    this._subject.next(newCourses);

    return fromPromise(this._saveCourse(courseId, changes));
  }

  private filterByCategory(category: string) {
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.category === category))
    );
  }

}
