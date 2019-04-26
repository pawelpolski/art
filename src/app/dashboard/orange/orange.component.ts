import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orange',
  templateUrl: './orange.component.html',
  styleUrls: ['./orange.component.scss']
})
export class OrangeComponent implements OnInit {
  company: string = 'orange';

  constructor() { }

  ngOnInit() {
  }

}
