import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'upc',
  templateUrl: './upc.component.html',
  styleUrls: ['./upc.component.scss']
})
export class UpcComponent implements OnInit {
  company: string = 'upc';

  constructor() { }

  ngOnInit() {
  }

}
