import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cpes-details',
  templateUrl: './cpes-details.component.html',
  styleUrls: ['./cpes-details.component.scss']
})
export class CpesDetailsComponent implements OnInit {

  @Input() cpe: any;
  @Input() company: string;

  constructor() { }

  ngOnInit() {
  }

}
