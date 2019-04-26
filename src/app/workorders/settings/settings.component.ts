import { Component, OnInit } from '@angular/core';
import { FcmService } from '../../services/fcm.service';
import { WorkordersService } from '../workorders.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  workorder: any = {
    wo: '' + new Date(),
    wo_id: '' + new Date(),
    monthAndYear: this.workordersService.convertDateToMonth(new Date())
  };
  files: any;
  calendar: any;
  calendar2: any;
  keys: any;
  values: any;
  pairsKeyVal: any[] = [];
  day: any;
  wholeDay: any;

  constructor(private fcm: FcmService,
    private workordersService: WorkordersService, private http: HttpClient) { }

  ngOnInit() {
    this.files = this.workordersService.getLastFiles();


  }



  getPermission() {
    this.fcm.getPermission().subscribe(a => console.log(a));
  }

  subscribeToTopic(topic) {
    this.fcm.sub(topic);
  }

}
