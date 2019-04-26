import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'netia',
  templateUrl: './netia.component.html',
  styleUrls: ['./netia.component.scss']
})
export class NetiaComponent implements OnInit {
  company: string = 'netia';
  
  constructor() { }

  ngOnInit() {
  }

}
