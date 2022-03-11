import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  data = {
    firstName: 'Eliseo',
    lastName: 'Plunker',
    myArray: [
      {
        emailAddress: 'eliseo@plunker.com',
        brave: 'solid',
      },
      {
        emailAddress: 'eliseo@plunker.org',
        brave: 'great',
      },
    ],
  };

  page: number = 0;

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
  fillData() {
    this.form = this.qcs.toFormGroup(this.questions);
    // //If we want to "fill" the form with "data"
    // //Add so element at array as was necesary
    for (let i = 0; i < this.data.myArray.length; i++) {
      this.addControls('myArray');
    }
    // //Use patchValue
    this.form.patchValue(this.data);
  }
  clearData() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
  addControls(control: string) {
    let question: any = this.questions.find((q) => q.key == control);
    let form = question ? question.form : null;
    if (form)
      (this.form.get(control) as FormArray).push(this.qcs.toFormGroup(form));
  }
  removeControls(control: string) {
    let array = this.form.get(control) as FormArray;
    array.removeAt(array.length - 1);
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
