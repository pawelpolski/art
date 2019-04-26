import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workorder } from '../../models/Workorder'
import { WorkordersService } from '../workorders.service';
import { CpesService } from '../cpes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'workorders-search',
  templateUrl: './workorders-search.component.html',
  styleUrls: ['./workorders-search.component.scss']
})
export class WorkordersSearchComponent implements OnInit {
  @Input() company: string = '';
  @Output() foundWorkorders = new EventEmitter<any>();
  @Output() foundCpe = new EventEmitter<any>();

  workorders: Workorder[] = [];
  cpeHistory: any[] = [];

  search: string = '';

  constructor(
    private workordersService: WorkordersService,
    private cpesService: CpesService,
    private router: Router,
  ) { }

  ngOnInit() {
  }


  showWorkorders() {
    if (this.search) {
      this.workordersService.getWorkordersByWoOrId(this.search.toUpperCase().trim(), this.company).subscribe(doc => {
        this.workorders = doc;
        this.foundWorkorders.emit(this.workorders);
      });
    }
  }

  showCpeHistory() {
    if (this.search) {
      this.cpesService.getCpeHistoryBySn(this.search.toUpperCase().trim(), this.company).subscribe(doc => {
        this.cpeHistory = doc;
        this.foundCpe.emit(this.cpeHistory);
        console.log(this.cpeHistory);
      });
    }
  }

  showWorkordersByTag() {
    if (this.search) {
      this.workordersService.getWorkordersByTag(this.search.toUpperCase().trim(), this.company.toUpperCase()).subscribe(doc => {
        this.workorders = doc;
        this.foundWorkorders.emit(this.workorders);
      });
    }
  }

}
