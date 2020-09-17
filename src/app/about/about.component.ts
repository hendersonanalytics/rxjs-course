import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';

import { APP_API } from '../constants/api';
import { createHttpObservable } from '../common/util'
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable(APP_API.GET_COURSES);

    const courses$ = http$.pipe(
      map((response) => response.payload)
    );

    courses$.subscribe(
      (courses) => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }
}
