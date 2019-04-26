import { Component, OnInit, Input } from '@angular/core';

import { Workorder } from '../../models/Workorder'

@Component({
  selector: 'workorders-status-icons',
  templateUrl: './workorders-status-icons.component.html',
  styleUrls: ['./workorders-status-icons.component.scss']
})
export class WorkordersStatusIconsComponent implements OnInit {
  @Input() workorder: Workorder;
  
  constructor() { }

  ngOnInit() {
  }

}
