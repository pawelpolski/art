import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { WorkordersService } from '../workorders.service';
import { CpesService } from '../cpes.service';
import { Observable, Subscription } from 'rxjs';
import { Workorder } from '../../models/Workorder'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { DataTransferService } from '../../data-transfer.service';
import { MemoriesService } from '../memories.service';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.scss']
})
export class WorkorderComponent implements OnInit {

  ownedCpes: any[] = [];
  files: any;
  workorder: Workorder;
  company: string = '';
  wo_id: string = '';
  neededData: any;
  loggedUserIn: any;
  users: any;
  codesValues: any;
  disabled: boolean = true;
  clientCpe: boolean = false;
  transfer: boolean = false;
  saved: boolean = false;
  toggle: boolean = false;
  subs: Subscription;
  subscribtion2: Subscription;
  visible = true;
  removable = true;
  addOnBlur = true;
  totalPrice: number = 0.0;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  memories: any;
  memoriesWo: any;
  memoriesPerson: any;
  equipment: any[] = [];
  cpeOwnedByClient: any;
  subscribtion3: Subscription;
  clientHistory: Workorder[];
  dzierzawa: boolean = false;
  equipmentsGroups: any[] = [];
  showOwnedCpes: boolean = false;
  showFiles: boolean = false;
  showForm = false;
  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(
    private workordersService: WorkordersService,
    private cpesService: CpesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService, 
    private dataService: DataTransferService,
    private memoriesService: MemoriesService,private _location: Location,
  ) { }

  ngOnInit() {
    this.wo_id = this.route.snapshot.params['wo_id'] + '';
    this.company = this.route.snapshot.params['company'] + '';

    this.dataService.neededDataCurrent.subscribe(doc => {
      this.neededData = doc;
    });

    this.dataService.loggedUserCurrent.subscribe(doc => {
      this.loggedUserIn = doc;
    });

    this.dataService.usersCurrent.subscribe(doc => {
      this.users = doc;
    });

    this.dataService.codesValuesCurrent.subscribe(doc => {
      this.codesValues = doc;
    });

    this.workordersService.getWorkorder(this.wo_id, this.company).valueChanges().subscribe(doc => {
      this.workorder = doc;
      this.workorder.date = doc.date.toDate();
      this.workorder.lastChange = new Date();
      if (this.workorder.probablyReturns) {
        this.cpeOwnedByClient = this.workorder.probablyReturns;
      } else {
        this.cpeOwnedByClient = [];
      }

      if (this.workorder.checked === 'Sprawdzone') {
        this.toggle = true;
      } else {
        this.toggle = false;
      }

      this.subscribtion3 = this.workordersService.getClientHistory(this.workorder.client, this.company).valueChanges().subscribe(doc => {

        if (doc) {
          this.clientHistory = doc.recentHistory;
          if (doc.cpeOwnedByClient) {
            this.cpeOwnedByClient = this.cpeOwnedByClient.concat(doc.cpeOwnedByClient);
          }

          if (this.cpeOwnedByClient && this.workorder.equipments) {
            let cpeOwnedByClient = this.cpeOwnedByClient.filter(item => this.workorder.equipments.indexOf(item) < 0);
            this.cpeOwnedByClient = cpeOwnedByClient.filter(function (item, pos) {
              return cpeOwnedByClient.indexOf(item) == pos;
            });
          }
        }
        this.subscribtion3.unsubscribe();
      })

      if (this.workorder.telephones) {
        this.workorder.telephones = this.workorder.telephones.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
      }

      this.workorder.equipments.forEach(sn => {
        this.equipment = [];
        this.subs = this.cpesService.getCpe(sn.toUpperCase(), this.company).valueChanges().subscribe(element => {
          if (element) {
            this.equipment.push({ sn: sn.toUpperCase(), status: 'OK' });
          } else {
            this.equipment.push({ sn: sn.toUpperCase(), status: 'Brak na stanie, popraw numer' });
          }
        });

      });
      this.memories = this.memoriesService.getMemoriesForClient(this.workorder, this.company);
      this.memoriesWo = this.memoriesService.getMemoriesForWorkorder(this.workorder, this.company);
      this.memoriesPerson = this.memoriesService.getMemoriesForPerson(this.workorder, this.company);

      this.memoriesService.getFilesForWo(this.workorder).subscribe(files => {
        this.files = files;
        if(files.length){
          this.showFiles = true;
        }
        console.log(files);
      });

      console.log(this.workorder);

    });


  }

  return(){
    this._location.back();
  }

  saveWorkorder() {
    this.workorder.checkedBy = this.loggedUserIn.name + ' ' + this.loggedUserIn.icon;
    if (!this.loggedUserIn.isAdmin) {
      this.workorder.checked = 'Niesprawdzone';
      this.workorder.operation = 'Zamknięte przez technika';
    } else {
      this.workorder.operation = 'Zamknięte przez koordynatora';
    }

    this.saved = true;
    console.log(this.workorder);

    this.workordersService.saveWorkorder(this.workorder, this.company)
      .then(res => {
        console.log("Saved: ", this.workorder)
        this.toastrService.success(this.workorder.wo, 'Zapisano zlecenie',  {
          timeOut: 3000
        });
      })
      .catch(res => {
        console.log("Error: ", this.workorder)
      });
  }

  askForCpeActivation() {
    if (confirm("Wysłać zgłoszenie o aktywacje wpisanego sprzętu?")) {
      this.cpesService.newCpeActivation(this.workorder, this.loggedUserIn.name, this.company)
        .then(res => {
          console.log('ok');
          this.toastrService.info('', 'Wysłano e-maila do biura',  {
            timeOut: 2000
          });
        })
        .catch(res => {
          console.log('error');
        });
      this.workorder.cpeActivated = false;

      this.workorder.operation = 'Zapytanie o aktywacje';
      this.saveWorkorder();
    }
  }


  askForDzierzawa() {
    if (confirm("Wysłać zgłoszenie o dzierżawę?")) {

      this.cpesService.newDzierzawa(this.workorder, this.loggedUserIn.name, this.company)
        .then(res => {
          this.dzierzawa = true;
          console.log('ok');
          this.toastrService.info('', 'Wysłano e-maila do biura',  {
            timeOut: 2000
          });

        })
        .catch(res => {
          console.log('error');
        });
    }
  }

  setCpeAsActivated() {
    if (confirm("Oznaczyć jako aktywowane?")) {
      this.cpesService.changeCpeActivationStatus(this.workorder, this.loggedUserIn.name)
        .then(res => {
          console.log('ok');
          this.toastrService.info('', 'Aktywowane',  {
            timeOut: 2000
          });
        })
        .catch(res => {
          console.log('error');
        });
      this.workorder.cpeActivated = true;
      this.workorder.operation = 'Aktywowanie sprzętu';
      this.saveWorkorder();
    }
  }

  toggleConsole() {
    if (this.toggle) {
      this.workorder.checked = 'Sprawdzone';
      this.workorder.checkedBy = this.loggedUserIn.name + ' ' + this.loggedUserIn.icon;
    } else {
      this.workorder.checked = 'Niesprawdzone';
      this.workorder.checkedBy = this.loggedUserIn.name + ' ' + this.loggedUserIn.icon;
    }
  }


  loadCpes() {
    this.showOwnedCpes = true;
    this.subscribtion2 = this.cpesService.getCpesForEachTech(this.workorder.location, this.company).subscribe(cpe => {
      this.toastrService.info('', 'Ładuję sprzęty...',  {
        timeOut: 2000
      });
      this.ownedCpes = cpe;
      let array = [];
      this.ownedCpes.forEach(el => {
        array.push({ sn: el.sn, type: el.type });
      });
      const newArray = [];

      array.forEach(item => {
        const existingItem = newArray.find(i => i.type === item.type);

        if (!existingItem) {
          newArray.push({ type: item.type, sn: [item.sn] });
        } else {
          existingItem.sn.push(item.sn);
        }
      });
      this.equipmentsGroups = newArray;
    });
  }


  addReturnToReturned(ret, index) {
    this.cpeOwnedByClient.splice(index, 1);
    this.workorder.returns.push(ret);
  }

  receiveLocation($event) {
    // For now use to string
    this.workorder.location = $event.toString();
    this.workorder.locations = $event;
    console.log($event);
  }

  receiveWo($event) {
    // For now use to string
    console.log($event);
  }

  receiveStatus($event) {
    this.workorder.status = $event;
    console.log($event);
  }

  getTimeFromDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return hours + ":" + minutes + ":" + seconds
  }

  setClientCpe() {
    if (this.clientCpe) {
      this.workorder.description = 'Sprzęt klienta na multiroom';
    } else {
      this.workorder.description = '';
    }
  }

  setTransfer() {
    if (this.transfer) {
      this.workorder.equipments = ['TRANSFER'];
    } else {
      this.workorder.equipments = [];
    }
  }

  addCpe(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {

      this.subs = this.cpesService.getCpe(value.toUpperCase(), this.company).valueChanges().subscribe(element => {
        if (element) {
          this.equipment.push({ sn: value.toUpperCase(), status: 'OK' });
          this.subs.unsubscribe();
        } else {
          this.equipment.push({ sn: value.toUpperCase(), status: 'Brak na stanie, popraw numer' });
          this.subs.unsubscribe();
        }
        console.log(this.equipment);
      });
      this.workorder.equipments.push(value.toUpperCase());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  removeCpe(cpe: any): void {
    let index = this.workorder.equipments.indexOf(cpe);
    if (index >= 0) {
      this.workorder.equipments.splice(index, 1);
      this.equipment.splice(index, 1);
    }
    this.toastrService.error(cpe, 'Usunięty',  {
      timeOut: 2000
    });
  }

  addMemories(type) {
    let desc = prompt("Wpisz opis memorki...", "");

    if (desc == null || desc == "") {
    } else {

      this.memoriesService.addMemForWoOrClient(this.workorder, desc, this.company, this.loggedUserIn.name, this.loggedUserIn.icon, type)
      .then(ref => console.log('ok')).catch(rej => console.log('ok'));
      this.toastrService.info(desc, 'Dodano memorkę', {
        timeOut: 2000
      });
    }
  }

  
  addMemoriesBig(type) {
    let desc = prompt("Wpisz opis memorki...", "");

    if (desc == null || desc == "") {
    } else {

      this.memoriesService.addFullMem(desc, this.loggedUserIn.name, this.loggedUserIn.icon, new Date(), this.workorder.locations, type, this.workorder.wo_id, this.workorder.client, this.company)
      .then(ref => console.log('ok')).catch(rej => console.log('ok'));
      this.toastrService.info(desc, 'Dodano memorkę', {
        timeOut: 2000
      });
    }
  }

  upload(event) {
    console.log(event.target.files[0])
    let fileName = '';
    let extension = '';
    let fullName = '';

    if (this.workorder.files) {
      extension = event.target.files[0].name.split('.').pop();
      fileName = this.workorder.wo + '_' + this.workorder.client + '_' + this.workorder.files.length;
      fullName = fileName + '.' + extension.toLowerCase();
    } else {
      extension = event.target.files[0].name.split('.').pop();
      fileName = this.workorder.wo + '_' + this.workorder.client + '_' + 0;
      fullName = fileName + '.' + extension.toLowerCase();
    }

    this.memoriesService.storageRef().ref('/workorders/' + this.workorder.monthAndYear + '/' + this.workorder.wo_id + '/' + fullName).put(event.target.files[0]);
    this.workordersService.addFile(this.workorder, this.company, fullName)
      .then(resolve => {
        this.toastrService.info(' ', 'Dodano plik',  {
          timeOut: 2000
        });
        //this.getLink(resolve);
      })
      .catch(reject => console.log("error"));
  }



  showModal() {
    this.showForm = !this.showForm;
  }

  formStatus($event) {
    this.showForm = $event;
  }

  copyValue(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.info(' ', 'Skopiowano', {
      timeOut: 2000
    });
  }

}
