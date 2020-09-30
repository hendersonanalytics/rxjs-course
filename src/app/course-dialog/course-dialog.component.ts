import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import { Store } from 'app/common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {
  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput : ElementRef;
  form: FormGroup;
  course:Course;

  constructor(
      private store: Store,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) course:Course ) {

      this.course = course;

      this.form = fb.group({
          description: [course.description, Validators.required],
          category: [course.category, Validators.required],
          releasedAt: [moment(), Validators.required],
          longDescription: [course.longDescription,Validators.required]
      });
  }

  ngAfterViewInit() {}

  save() {
    this.store.saveCourse(this.course.id, this.form.value)
      .subscribe(
        () => this.close(),
        (err) => console.log('error saving course', err)
      );
  }

  close() {
      this.dialogRef.close();
  }

}
