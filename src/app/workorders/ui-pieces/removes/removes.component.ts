import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { DataTransferService } from '../../../data-transfer.service';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';

import { Workorder } from '../../../models/Workorder';

@Component({
  selector: 'removes-choose',
  templateUrl: './removes.component.html',
  styleUrls: ['./removes.component.scss']
})
export class RemovesComponent implements OnInit {

  @Input() workorder: Workorder;

  visible = true;
  removable = true;
  addOnBlur = true;
  totalPrice: number = 0.0;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  constructor() { }

  ngOnInit() {
  }


  addReturns(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value.toUpperCase();
    // Add our fruit
    if ((value || '').trim()) {
      this.workorder.returns.push(value.toUpperCase());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeReturns(cpe: any): void {
    console.log(cpe, this.workorder.returns)
    let index = this.workorder.returns.indexOf(cpe);

    if (index >= 0) {
      this.workorder.returns.splice(index, 1);
    }
  }
}
