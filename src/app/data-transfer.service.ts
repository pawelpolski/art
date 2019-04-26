import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataTransferService {

  private upcNeededDataSource = new BehaviorSubject<any>('');
  neededDataCurrent = this.upcNeededDataSource.asObservable();

  private locationSource = new BehaviorSubject<any>('');
  locationCurrent = this.locationSource.asObservable();

  private loggedUserDataSource = new BehaviorSubject<any>('');
  loggedUserCurrent = this.loggedUserDataSource.asObservable();

  private downloadedWorkordersDataSource = new BehaviorSubject<any>('');
  downloadedWorkordersCurrent = this.downloadedWorkordersDataSource.asObservable();

  private downloadedWorkordersDataSourceNETIA = new BehaviorSubject<any>('');
  downloadedWorkordersCurrentNETIA = this.downloadedWorkordersDataSourceNETIA.asObservable();

  private downloadedWorkordersDataSourceORANGE = new BehaviorSubject<any>('');
  downloadedWorkordersCurrentORANGE = this.downloadedWorkordersDataSourceORANGE.asObservable();

  private queryDataSource = new BehaviorSubject<any>('');
  queryCurrent = this.queryDataSource.asObservable();

  private queryDataSourceNETIA = new BehaviorSubject<any>('');
  queryCurrentNETIA = this.queryDataSourceNETIA.asObservable();

  private cpesSource = new BehaviorSubject<any>('');
  cpesCurrent = this.cpesSource.asObservable();

  private usersSource = new BehaviorSubject<any>('');
  usersCurrent = this.usersSource.asObservable();

  private codesValuesSource = new BehaviorSubject<any>('');
  codesValuesCurrent = this.codesValuesSource.asObservable();
  
  constructor() { }

  sendNeededData(data) {
    this.upcNeededDataSource.next(data);
  }
  
  sendLocation(data) {
    this.locationSource.next(data);
  }

  sendLoggedUser(data) {
    this.loggedUserDataSource.next(data);
  }
  
  sendDownloadedWorkorders(data) {
    this.downloadedWorkordersDataSource.next(data);
  }  
  
  sendDownloadedWorkordersNETIA(data) {
    this.downloadedWorkordersDataSourceNETIA.next(data);
  }
  sendDownloadedWorkordersORANGE(data) {
    this.downloadedWorkordersDataSourceORANGE.next(data);
  }
  
  sendQuery(data) {
    this.queryDataSource.next(data);
  }

  sendQueryNETIA(data) {
    this.queryDataSourceNETIA.next(data);
  }

  sendCpes(data) {
    this.cpesSource.next(data);
  }  
  
  sendUsers(data) {
    this.usersSource.next(data);
  }

  sendCodesValues(data) {
    this.codesValuesSource.next(data);
  }
}
