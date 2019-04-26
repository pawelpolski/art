import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { DataTransferService } from '../../../data-transfer.service';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { WorkordersService } from '../../workorders.service';
import { Observable } from 'rxjs';

import { Workorder } from '../../../models/Workorder';


@Component({
  selector: 'info-box',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {

  @Input() workorder: Workorder;
  @Input() company: string;
  equipments: any = [];

  constructor(
    private workordersService: WorkordersService,
    ) { }

  ngOnInit() {
  }


  

  
}
