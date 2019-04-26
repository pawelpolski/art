import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { DataTransferService } from '../../../data-transfer.service';
import { CodesComponent } from '../codes/codes.component';

@Component({
  selector: 'location-dropdown',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;
  @Input() location: any;

  @Output() locationMsg = new EventEmitter<any>();



  neededData: any;
  loggedUserIn: any;

  constructor(
    private dataService: DataTransferService
  ) { }

  ngOnInit() {
    this.dataService.neededDataCurrent.subscribe(doc => {
      this.neededData = doc;
    });
    this.dataService.loggedUserCurrent.subscribe(doc => {
      this.loggedUserIn = doc;

      if (this.multiple === false) {
        if (this.loggedUserIn.isAdmin) {
          this.location = "ALL";
        } else {
          this.location = doc.name;
        }

        this.sendLocationToParent();
      } else if (this.multiple === true) {

      }
    });
  }

  sendLocationToParent() {
    this.locationMsg.emit(this.location);
  }



}


