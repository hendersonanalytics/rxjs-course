import { Component, OnInit } from '@angular/core';
import { createHttpObservable } from 'app/common/util';
import { APP_API } from 'app/constants/api';
import { concat, interval, merge, of } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable(APP_API.GET_COURSES);
    const sub = http$.subscribe(console.log);

    setTimeout(() => {
      sub.unsubscribe();
    }, 0);
  }
}
