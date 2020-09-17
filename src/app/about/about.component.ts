import { Component, OnInit } from '@angular/core';
import { concat, interval, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const source1$ = of(1,2,3);
    const source2$ = of(4,5,6);
    const source3$ = of(7,8,9);

    // concat only starts the next observable after the previous one has completed
    const result$ = concat(source1$, source2$, source3$);
    result$.subscribe(val => console.log(val));
  }
}
