import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { DataTransferService } from './data-transfer.service';
import { NeededDataService } from './services/needed-data.service';
import { NotifyService } from './core/notify.service';
import { FcmService } from './services/fcm.service';
import { auth } from 'firebase';
import { CpesService } from './workorders/cpes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  neededData: any;
  users: any;
  codesValues: any;
  show = false;
  events: string[] = [];
  opened: boolean;
  loggedUserIn: any;
  activations: any = [];
  
  constructor(
    public auth: AuthService,
    private neededDataService: NeededDataService,
    private dataTransfer: DataTransferService,
    private notify: NotifyService,
    private fcm: FcmService,
    private cpesService: CpesService,
    ) {}

  ngOnInit() {
    this.neededDataService.getNeededData().valueChanges().subscribe(doc => {
      this.neededData = doc;
      this.dataTransfer.sendNeededData(this.neededData);
    });

    this.auth.user.subscribe(user => {
      this.dataTransfer.sendLoggedUser(user);
    });

    this.cpesService.getRecentActivations().subscribe(acti => {
      this.activations = acti;
    });
    
    this.fcm.showMessages().subscribe();

    this.neededDataService.getUsers().subscribe(doc => {
      this.users = doc;
      this.dataTransfer.sendUsers(this.users);
    });

    this.neededDataService.getCodesValues().subscribe(doc => {
      this.codesValues = doc;
      this.dataTransfer.sendCodesValues(this.codesValues);
    });

  }
  toggleCollapse() {
    this.show = !this.show;
  }
}
