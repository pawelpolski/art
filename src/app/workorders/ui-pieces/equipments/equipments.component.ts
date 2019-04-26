import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { DataTransferService } from '../../../data-transfer.service';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';

import { Workorder } from '../../../models/Workorder';

@Component({
  selector: 'equipments-choose',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  @Input() workorder: Workorder;

  visible = true;
  removable = true;
  addOnBlur = true;
  totalPrice: number = 0.0;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  

  constructor() { }

  ngOnInit() {
  }

  addCpe(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      // this.subs = this.cpeService.getCpe(value.toUpperCase()).subscribe(element => {
      //   if (element) {
      //     this.cpeArray.push({ sn: value.toUpperCase(), status: 'OK' });
      //     this.subs.unsubscribe();
      //   } else {
      //     this.cpeArray.push({ sn: value.toUpperCase(), status: 'Brak na stanie' });
      //     this.toastr.error('Nie ma sprzętu: ' + value.toUpperCase() + ' w bazie! Usuń z wydawanych!');
      //     this.subs.unsubscribe();
      //   }
      //   console.log(this.cpeArray);
      // });
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
      //this.cpeArray.splice(index, 1);
    }
  }
  
}
