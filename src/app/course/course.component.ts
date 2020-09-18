import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable, getLessonsQueryParams } from 'app/common/util';
import { APP_API } from 'app/constants/api';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  public courseId: number = this.route.snapshot.params['id'];
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]> = of([]);

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
      this.course$ = createHttpObservable(`${APP_API.GET_COURSES}/${this.courseId}`);
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event['target'].value),
        debounceTime(200),
      ).subscribe(console.log);


    // this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     map(event => event['target'].value),
    //     startWith(''), // we put this value in the stream first, before stream emits anything
    //     debounceTime(200),
    //     distinctUntilChanged(),
    //     switchMap((searchTerm: string) =>  this.loadLessons(searchTerm))
    //   );
  }

  loadLessons(searchTerm: string = '') : Observable<Lesson[]> {
    return createHttpObservable(`${APP_API.GET_LESSONS}${getLessonsQueryParams(this.courseId, searchTerm)}`)
        .pipe(map(response => response.payload));
  }
}
