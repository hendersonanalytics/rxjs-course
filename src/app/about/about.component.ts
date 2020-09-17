import { Component, OnInit } from '@angular/core';
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
    const interval1$ = interval(1000);
    const interval2$ = interval(2500);
    const interval3$ = interval1$.pipe(
      map(val => 10 * val)
    );

    const result$ = merge(interval1$, interval2$, interval3$);
    // result$.subscribe(val => console.log(val));
  }
}
