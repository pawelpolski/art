import { Component, OnInit, Input } from '@angular/core';

import { MemoriesService } from '../memories.service';
import { DataTransferService } from '../../data-transfer.service';
import { SallaryService } from '../sallary.service';
import { WorkordersService } from '../workorders.service';

@Component({
  selector: 'sallary-component',
  templateUrl: './sallary.component.html',
  styleUrls: ['./sallary.component.scss']
})
export class SallaryComponent implements OnInit {
  
  @Input() company: string;
  toRemoveCount: number = 0.0;
  users: any[] = [];
  user: string = '';
  month: string = '';
  sallaryInfo: any = [];
  sallaryInfoNetia: any = [];
  salary: any[] = [];
  neededData: any;
  usersForList: string[];
  loggedUserIn: any = {};
  showSpinner: boolean = false;
  toRemove: any[] = [];
  usersSallaryInfo: any = [];

  constructor(
    private sallaryService: SallaryService,
    private workorderService: WorkordersService,
    private data: DataTransferService
    ) { }

  ngOnInit() {
    this.sallaryService.getAllUsers().valueChanges().subscribe(user => {
      this.users = user;
    });
    this.data.neededDataCurrent.subscribe(msg => {
      this.neededData = msg;
      this.usersForList = msg.users;
    });
    this.data.loggedUserCurrent.subscribe(msg => {
      this.loggedUserIn = msg;
      this.user = msg.name;
    });
    this.month = this.workorderService.convertDateToMonth(new Date());

  }


  receiveLocation($event) {
    // For now use to string
    this.user = $event.toString();
    console.log($event);
  }


  getSalaryForUser() {
    this.showSpinner = true;
    let found = this.users.find(user => user.name == this.user);

    this.workorderService.getworksToRemoveByLocation(this.user, this.month).valueChanges().subscribe(works => {
      this.toRemove = works;
      this.toRemoveCount = this.toRemove.length;
    });

    this.sallaryService.getSalary(found.user_id, this.month).valueChanges().subscribe(salary => {
      this.showSpinner = false;
      this.sallaryInfo = salary;
      console.log(this.sallaryInfo, this.user, this.users, this.month, salary);
      this.getNetiaSallary(found);
    });

    if (this.user === 'ALL') {
      this.usersSallaryInfo = [];
      this.users.forEach(user => {
        this.sallaryService.getAllUsersSallary(user.user_id, this.month).valueChanges().subscribe(info => {
          if (info) {
            this.sallaryInfo.rg6 = 0.0;
            this.sallaryInfo.zmr = 0.0;
            this.sallaryInfo.zmp = 0.0;
            this.usersSallaryInfo.push(info);
            this.usersSallaryInfo.forEach(el => {
              if (el.rg6) {
                this.sallaryInfo.rg6 += el.rg6;
              } else {
                this.sallaryInfo.rg6 += 0.0;
              }
              if (el.zmr) {
                this.sallaryInfo.zmr += el.zmr;
              } else {
                this.sallaryInfo.zmr += 0.0;
              }
              if (el.zmp) {
                this.sallaryInfo.zmp += el.zmp;
              } else {
                this.sallaryInfo.zmp += 0.0;
              }
            });
          };
        });
      });
    }
  }


  getNetiaSallary(found){
    
    this.sallaryService.getSalaryNetia(found.user_id, this.month).valueChanges().subscribe(salary => {
      this.showSpinner = false;
      this.sallaryInfoNetia = salary;
      console.log(this.sallaryInfo, this.user, this.users, this.month, salary);
    });
  }

}
