import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataTransferService } from '../../../data-transfer.service';

@Component({
  selector: 'status-dropdown',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  
  @Output() statusMsg = new EventEmitter<any>();
  status: string = 'Zamknięte przez technika';
  neededData: any;

  constructor(
    private dataService: DataTransferService
    ) { }

    ngOnInit() {
      this.dataService.neededDataCurrent.subscribe(doc => {
        this.neededData = doc;
      });
      this.sendStatusToParent();
    }

    sendStatusToParent(){
      this.statusMsg.emit(this.status);
    }
}


