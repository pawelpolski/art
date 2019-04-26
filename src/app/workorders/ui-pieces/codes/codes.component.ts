import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DataTransferService } from '../../../data-transfer.service';

import { Workorder } from '../../../models/Workorder'
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';

@Component({
  selector: 'codes-choose',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss'],
})
export class CodesComponent implements OnInit {
  @Input() workorder: Workorder;
  @Input() neededData: any;
  @Input() loggedUserIn: any;
  @Input() users: any;
  @Input() codesValues: any;
  @Input() location: any;

  codes: any;

  constructor() { }

  ngOnInit() {
    this.getValues();
    this.countTotalPrice();
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if(changes || !changes.location.firstChange){
      this.getValues();
      this.countTotalPrice();
    }
  }

  visible = true;
  removable = true;
  addOnBlur = true;
  totalPrice: number = 0.0;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.workorder.codes.push(this.checkCodes(value.trim().toLocaleUpperCase()));
    }

    if (input) {
      input.value = '';
    }
    this.getValues();
    this.countTotalPrice();
  }

  remove(code: any): void {
    console.log(this.codesValues[0])
    let index = this.workorder.codes.indexOf(code);
    if (index >= 0) {
      this.workorder.codes.splice(index, 1);
    }
    this.getValues();
    this.countTotalPrice();
  }

  getValues() {
    if (this.loggedUserIn.isAdmin) {
      if (this.workorder.location == 'KRZEMIŃSKI KAMIL' || this.workorder.location == 'MICUŁA MATEUSZ' || this.workorder.location == 'KOZŁOWSKI DARIUSZ') {
        this.codes = this.codesValues[2].values;
      } else if (this.workorder.location == 'SMALCERZ KRZYSZTOF') {
        this.codes = this.codesValues[1].values;
      } else {
        this.codes = this.codesValues[0].values;
      };
    } else {
      if (this.loggedUserIn.codesValues === 'Jastrzębie') {
        this.codes = this.codesValues[0].values;
      } else if (this.loggedUserIn.codesValues === 'Zabrze') {
        this.codes = this.codesValues[2].values;
      } else if (this.loggedUserIn.codesValues === 'SMALCERZ KRZYSZTOF') {
        this.codes = this.codesValues[1].values;
      }
    }
  }

  checkCodes(name: string) {
    const found = this.codes.find(item => item.name === name.trim());
    return found ? { name: found.name, status: 'ok' } : { name: name, status: 'error' };
  }

  checkValue(element) {
    const found = this.codes.find(item => item.name === element.name);
    return found ? found.value : 0.0;
  }

  countTotalPrice() {
    this.workorder.value = 0.0;
    this.workorder.codes.forEach(element => {
      this.workorder.value = this.workorder.value + this.checkValue(element);
    })
    if (this.workorder.locations.length > 0) {
      this.workorder.value = this.workorder.value / this.workorder.locations.length;
    } else {
      this.workorder.value = 0.0;
    }
  }


  setQDSZOB() {
    this.workorder.codes = [{ name: "QDS", status: "ok" }, { name: "ZOB", status: "ok" }];
    this.workorder.status = 'Zamknięte przez technika';
    this.workorder.description = '';
    this.countTotalPrice();
  }

  setQDSZOF() {
    this.workorder.codes = [{ name: "QDS", status: "ok" }, { name: "ZOF", status: "ok" }];
    this.workorder.status = 'Zamknięte przez technika';
    this.workorder.description = '';
    this.countTotalPrice();
  }

  setCanceled(code) {
    this.workorder.codes = [{ name: code, status: "ok" }];
    if (code === '3T5') {
      this.workorder.description = 'Wielokrotna próba';
    } else {
      this.workorder.description = '';
    }
    this.workorder.status = 'Zamknięte przez technika';
    this.countTotalPrice();
  }

  addCode(code) {
    this.workorder.codes.push({ name: code, status: "ok" });
    this.workorder.status = 'Zamknięte przez technika';
    this.countTotalPrice();
  }
}
