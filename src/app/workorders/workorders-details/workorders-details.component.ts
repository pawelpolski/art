import { Component, OnInit, Input } from '@angular/core';

import { Workorder } from '../../models/Workorder'

@Component({
  selector: 'workorders-details',
  templateUrl: './workorders-details.component.html',
  styleUrls: ['./workorders-details.component.scss']
})
export class WorkordersDetailsComponent implements OnInit {
  @Input() workorder: Workorder;
  @Input() company: string;

  constructor() { }

  ngOnInit() {
  }



}
