import { Component, OnInit, Input } from '@angular/core';
import { DataTransferService } from '../../data-transfer.service';

import { Workorder } from '../../models/Workorder'

@Component({
  selector: 'workorders-type-badges',
  templateUrl: './workorders-type-badges.component.html',
  styleUrls: ['./workorders-type-badges.component.scss']
})
export class WorkordersTypeBadgesComponent implements OnInit {
  @Input() workorder: Workorder;
  loggedUserIn: any;

  constructor(
    private dataService: DataTransferService) { }

  ngOnInit() {
    this.dataService.loggedUserCurrent.subscribe(doc => {
      this.loggedUserIn = doc;
    });
  }

}
