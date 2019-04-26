import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MemoriesService } from '../memories.service';

@Component({
  selector: 'memories-modal',
  templateUrl: './memories-modal.component.html',
  styleUrls: ['./memories-modal.component.scss']
})
export class MemoriesModalComponent implements OnInit {

  @Input() type: any;
  @Input() showForm: any;
  @Input() loggedUserIn: any;

  @Output() formStatus = new EventEmitter<any>();

  toBeDoneDate: any = new Date();
  description: string;
  person: string[] = [];
  mem_type: string = 'person';
  wo: string = '';
  client: string = '';

  constructor(private memoriesService: MemoriesService, ) { }

  ngOnInit() {
  }

  addMem() {
    if (this.description === '' || this.description === null || this.description === undefined) {
      this.closeForm();
    } else {
      this.memoriesService.addFullMem(
        this.description,
        this.loggedUserIn.name,
        this.loggedUserIn.icon,
        this.toBeDoneDate,
        this.person,
        this.mem_type,
        this.wo,
        this.client,
        'upc'
      )
        .then(ref => {
          console.log('ok');
          this.closeForm();
          this.clearForm();
        })
        .catch(rej => {
          console.log('error');
          this.closeForm();
          this.clearForm();
        });

    }
  }

  receiveLocation($event) {
    this.person = $event;
    console.log($event);
  }

  closeForm() {
    this.showForm = !this.showForm;
    this.formStatus.emit(false);
  }

  clearForm(){
    this.description = '';
    this.client = '';
    this.wo = '';
    this.person = [];
    this.toBeDoneDate = new Date();
  }
}
