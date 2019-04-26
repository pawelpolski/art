import { Component, OnInit, Input } from '@angular/core';
import { WorkordersService } from '../workorders.service';
import { Observable, Subscription } from 'rxjs';
import { Workorder } from '../../models/Workorder'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataTransferService } from '../../data-transfer.service';
import { FcmService } from '../../services/fcm.service';
import { NotifyService } from '../../core/notify.service';
import * as XLSX from 'xlsx';
import {Location} from '@angular/common';

@Component({
  selector: 'workorders-list',
  templateUrl: './workorders-list.component.html',
  styleUrls: ['./workorders-list.component.scss']
})
export class WorkordersListComponent implements OnInit {
  @Input() company: string = '';

  queryData: any = {

  };
  subscription1: Subscription;
  workorders: Workorder[];
  cpes: any[];
  tempWorks: any [];
  tempWorksAndServices: any [];
  neededData: any;
  ownedMoney: number = 0.0;
  showProgressBar: boolean = false;
  sallaryInfo: any;
  userSallary: any;

  constructor(
    private workordersService: WorkordersService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataTransferService,
    private fcm: FcmService,
    private notify: NotifyService, private _location: Location
  ) { }

  ngOnInit() {
    this.dataService.neededDataCurrent.subscribe(doc => {
      this.neededData = doc;
    });


    if (this.company === 'upc') {
      this.workorders = [];
      this.dataService.downloadedWorkordersCurrent.subscribe(doc => {
        this.workorders = doc;
        this.countValue();
      });
    } else if (this.company === 'netia') {
      this.dataService.downloadedWorkordersCurrentNETIA.subscribe(doc => {
        this.workorders = doc;
        this.countValue();
      });
    } else if (this.company === 'orange') {
      this.dataService.downloadedWorkordersCurrentORANGE.subscribe(doc => {
        this.workorders = doc;
        this.countValue();
      });
    }

  }

  countValue() {
    if(this.workorders){
      this.ownedMoney = 0.0;
      this.workorders.forEach(wo => {
        this.ownedMoney += wo.value;
      })
    }
  }

  forward(){
    console.log('swiperight');
    this._location.forward();
  }


  receiveQuery($event) {
    this.showProgressBar = true;
    this.workorders = [];
    this.queryData = $event;
    console.log(this.queryData);
    this.subscription1 = this.workordersService.getData(this.queryData, this.company).subscribe(doc => {
      this.workorders = doc;
      this.countValue();
      this.showProgressBar = false;
      // send workorders via behaviorSubject
      if (this.company === 'upc') {
        this.dataService.sendDownloadedWorkorders(this.workorders);
      } else if (this.company === 'netia') {
        this.dataService.sendDownloadedWorkordersNETIA(this.workorders);
      } else if (this.company === 'orange') {
        this.dataService.sendDownloadedWorkordersORANGE(this.workorders);
      }
      
    });
  }
  
  receiveQuerySpecial_1($event) {
    this.showProgressBar = true;
    this.workorders = [];
    this.queryData = $event;
    console.log(this.queryData);
    

    this.subscription1 = this.workordersService.getDataSpecial_1(this.queryData, this.company).subscribe(doc => {



      this.workorders = doc;
      this.countValue();
      this.showProgressBar = false;
      if(this.queryData.status === 'Zamknięte przez technika'){
        this.workordersService.getUserUid(this.queryData.location).subscribe(user => {
          this.userSallary = user;        
          this.generateSallary(this.company);
        });

      }
      // send workorders via behaviorSubject
      if (this.company === 'upc') {
        this.dataService.sendDownloadedWorkorders(this.workorders);
      } else if (this.company === 'netia') {
        this.dataService.sendDownloadedWorkordersNETIA(this.workorders);
      } else if (this.company === 'orange') {
        this.dataService.sendDownloadedWorkordersORANGE(this.workorders);
      }
      
    });
  }

  receiveQuerySpecial_2($event) {
    this.showProgressBar = true;
    this.workorders = [];
    this.queryData = $event;
    console.log(this.queryData);

    this.subscription1 = this.workordersService.getDataSpecial_2(this.queryData, this.company).subscribe(doc => {
      this.workorders = doc;
      this.countValue();
      this.showProgressBar = false;

      // send workorders via behaviorSubject
      if (this.company === 'upc') {
        this.dataService.sendDownloadedWorkorders(this.workorders);
      } else if (this.company === 'netia') {
        this.dataService.sendDownloadedWorkordersNETIA(this.workorders);
      } else if (this.company === 'orange') {
        this.dataService.sendDownloadedWorkordersORANGE(this.workorders);
      }
      
    });
  }

  receiveSearchData($event) {
    this.workorders = $event;
  }

  receiveSearchCpe($event) {
    this.cpes = $event;
  }

  downloadCard() {
    this.tempWorks = [];
    this.workorders.forEach(wo => {
      wo.codesString = [];
      wo.equipmentsString = [];
      wo.returnsString = [];

      wo.codes.forEach(code => {
        wo.codesString.push(code.name);
      });
      
      wo.equipments.forEach(eq => {
        wo.equipmentsString.push(eq);
      });
      wo.returns.forEach(ret => {
        wo.returnsString.push(ret);
      });
      
      if (wo.type != 'Serwis') {
        this.tempWorks.push({
          taurus_wo: wo.taurus_wo,
          wo: wo.wo,
          city_street: wo.city + ', ' + wo.street + ' ' + wo.home + '/' + wo.locale,
          value: wo.value,
          codes_s: wo.codesString.toString(),
          equipments_s: wo.equipmentsString.toString(),
          returns_s: wo.returnsString.toString(),
          description: wo.description,
          wo_id: wo.wo_id,
          ...wo,
        });
      }
    })

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tempWorks);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    let fileName = 'Karta pracy ' + new Date().toLocaleDateString() + '.xlsx';
    XLSX.writeFile(workbook, fileName, { bookType: 'xlsx', type: 'buffer' });
  }

  downloadCardAll() {
    this.tempWorks = [];
    this.workorders.forEach(wo => {
      wo.codesString = [];
      wo.equipmentsString = [];
      wo.returnsString = [];

      wo.codes.forEach(code => {
        wo.codesString.push(code.name);
      });
      
      wo.equipments.forEach(eq => {
        wo.equipmentsString.push(eq);
      });
      wo.returns.forEach(ret => {
        wo.returnsString.push(ret);
      });
      
        this.tempWorks.push({
          taurus_wo: wo.taurus_wo,
          wo: wo.wo,
          city_street: wo.city + ', ' + wo.street + ' ' + wo.home + '/' + wo.locale,
          value: wo.value,
          codes_s: wo.codesString.toString(),
          equipments_s: wo.equipmentsString.toString(),
          returns_s: wo.returnsString.toString(),
          description: wo.description,
          wo_id: wo.wo_id,
          ...wo,
        });
 
    })

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tempWorks);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    let fileName = 'Zlecenia + Serwisy ' + new Date().toLocaleDateString() + '.xlsx';
    XLSX.writeFile(workbook, fileName, { bookType: 'xlsx', type: 'buffer' });
  }

    //upc
   generateSallary(company) {
      this.ownedMoney = 0.0;
      this.sallaryInfo = {
        workedOnFreeDay: 0,
        workedOnFreeDayValue: 0,
        notFinished: 0,
        finished: 0,
        finishedValue: 0,
        ownedMoney: 0,
        finishedServices: 0,
        finishedServicesValue: 0,
        finishedWorks: 0,
        finishedWorksValue: 0,
        toRemove: 0,
        owner: '',
        monthAndYear: '',
        rg6FromCodes: 0,
        zmpFromCodes: 0,
        zmrFromCodes: 0,
      };
  
      this.sallaryInfo.monthAndYear = this.queryData.monthAndYear;
      this.sallaryInfo.owner = this.queryData.location;

  
       this.workorders.forEach(wo => {
          this.ownedMoney += wo.value;
  
          wo.codes.forEach(code => {
            if (code.name === 'ZIU') {
              this.sallaryInfo['rg6FromCodes'] += 15.0;
            }
            if (code.name === 'ZMI') {
              this.sallaryInfo['rg6FromCodes'] += 10.0;
            }
            if (code.name === 'ZMR') {
              this.sallaryInfo['zmrFromCodes'] += 1.0;
            }
            if (code.name === 'ZMP') {
              this.sallaryInfo['zmpFromCodes'] += 1.0;
            }
          })
  
          this.sallaryInfo['ownedMoney'] += wo.value;
  
          if (wo.toRemove === true) {
            this.sallaryInfo['toRemove']++;
          }
  
          if (wo.value > 99) {
            this.sallaryInfo['workedOnFreeDay']++;
            this.sallaryInfo['workedOnFreeDayValue'] += wo.value;
          } else if (wo.value === 0) {
            this.sallaryInfo['notFinished']++;
          } else {
            this.sallaryInfo['finished']++;
            this.sallaryInfo['finishedValue'] += wo.value;
            if (wo.type === 'Serwis') {
              this.sallaryInfo['finishedServices']++;
              this.sallaryInfo['finishedServicesValue'] += wo.value;
            } else {
              this.sallaryInfo['finishedWorks']++;
              this.sallaryInfo['finishedWorksValue'] += wo.value;
            }
          }
  
        })
        this.sallaryInfo['company'] = company;
       this.saveToTechnical(this.sallaryInfo);
      
    }

      //upc
  saveToTechnical(data) {
    this.workordersService.saveSallaryToUser(this.userSallary[0], data, this.company).then(resolve => {
      this.notify.update("Podliczona wypłata dla: " + this.userSallary[0].name + " z " + this.queryData.monthAndYear, 'info')

    }
      
      );
  }

}
