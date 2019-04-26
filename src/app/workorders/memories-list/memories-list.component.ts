import { Component, OnInit } from '@angular/core';
import { WorkordersService } from '../workorders.service';
import { MemoriesService } from '../memories.service';
import { DataTransferService } from '../../data-transfer.service';
import { FcmService } from '../../services/fcm.service';

@Component({
  selector: 'memories-list',
  templateUrl: './memories-list.component.html',
  styleUrls: ['./memories-list.component.scss']
})
export class MemoriesListComponent implements OnInit {

  memoriesAdmin: any;
  memoriesClient: any;
  memoriesFuture: any;
  memoriesPerson: any;
  memoriesWo: any;
  loggedUserIn: any;
  showForm: boolean = false;
  toBeDoneDate: any = new Date();
  description: string;
  type: string = '';

  constructor(
    private workordersService: WorkordersService, private memoriesService: MemoriesService,
    private dataService: DataTransferService, ) { }

  ngOnInit() {
    this.dataService.loggedUserCurrent.subscribe(doc => {
      this.loggedUserIn = doc;

      if (this.loggedUserIn.isAdmin) {

        this.memoriesService.getPersonMemories('Admin').subscribe(mems => {
          this.memoriesPerson = mems;
        });

        // this.memoriesService.getLastMemoriesAdmin().subscribe(mems => {
        //   this.memoriesAdmin = mems;
        // });

        this.memoriesService.getLastMemoriesClient().subscribe(mems => {
          this.memoriesClient = mems;
        });

        this.memoriesService.getLastMemoriesWo().subscribe(mems => {
          this.memoriesWo = mems;
        });

        this.memoriesService.getFutureMemories('Admin').subscribe(mems => {
          this.memoriesFuture = mems;
        });

      } else {

        this.memoriesService.getPersonMemories(this.loggedUserIn.name).subscribe(mems => {
          this.memoriesPerson = mems;
        });

        this.memoriesService.getFutureMemories(this.loggedUserIn.name).subscribe(mems => {
          this.memoriesFuture = mems;
        });

      }
    });
  }


  formStatus($event) {
    this.showForm = $event;
  }

  openForm(type) {
    this.type = type;
    this.showForm = !this.showForm;
  }



}
