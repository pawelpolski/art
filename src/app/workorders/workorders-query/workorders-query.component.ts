import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataTransferService } from '../../data-transfer.service';
import { WorkordersService } from '../workorders.service';
import { Observable } from 'rxjs';
import { Workorder } from '../../models/Workorder'

@Component({
  selector: 'workorders-query',
  templateUrl: './workorders-query.component.html',
  styleUrls: ['./workorders-query.component.scss']
})
export class WorkordersQueryComponent implements OnInit {
  queryData: any = {
    location: '',
    status: '',
    startingDate: this.workordersService.setDayBeforeToday(),
    endingDate: new Date(),
    monthAndYear: 'Luty 2019'
  };

  @Input() company: string;
  month: string = '';
  @Output() messageQuery = new EventEmitter<any>();
  @Output() messageQuerySpecial_1 = new EventEmitter<any>();
  @Output() messageQuerySpecial_2 = new EventEmitter<any>();
  neededData: any;
  loggedUserIn: any;
  
  constructor(
    private dataService: DataTransferService,
    private workordersService: WorkordersService,
    ) { }

  ngOnInit() {
    this.dataService.neededDataCurrent.subscribe(doc => {
      this.neededData = doc;
    });
    this.dataService.loggedUserCurrent.subscribe(doc => {
      this.loggedUserIn = doc;
    });
    this.month = this.workordersService.convertDateToMonth(new Date());
  }

  showWorkorders(){
    this.messageQuery.emit(this.queryData);
  }

  showAllClosed(){
    let tempQuery = {
      monthAndYear: this.month,
      status: 'Zamknięte przez technika',
      location: this.queryData.location,
    };
    this.messageQuerySpecial_1.emit(tempQuery);
  }

  showAllOpen(){
    let tempQuery = {
      monthAndYear: this.month,
      status: 'Przydzielono do technika',
      location: this.queryData.location,
    };
    this.messageQuerySpecial_1.emit(tempQuery);
  }

  showAllChecked(){
    let tempQuery = {
      monthAndYear: this.month,
      checked: 'Sprawdzone',
      status: 'Zamknięte przez technika',
      location: this.queryData.location,
    };
    this.messageQuerySpecial_2.emit(tempQuery);
  }

  showAllCheckedAndNotSended(){
    let tempQuery = {
      monthAndYear: this.month,
      checked: 'Sprawdzone',
      sended: false,
      status: 'Zamknięte przez technika',
      location: this.queryData.location,
    };
    this.messageQuerySpecial_2.emit(tempQuery);
  }

  showAllNotChecked(){
    let tempQuery = {
      monthAndYear: this.month,
      checked: 'Niesprawdzone',
      status: 'Zamknięte przez technika',
      location: this.queryData.location,
    };
    this.messageQuerySpecial_2.emit(tempQuery);
  }

  receiveLocation($event) {
    // For now use to string
    this.queryData.location = $event.toString();
    console.log($event);
  }

  receiveStatus($event) {
    this.queryData.status = $event;
    console.log($event);
  }



}
