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

  }
}
