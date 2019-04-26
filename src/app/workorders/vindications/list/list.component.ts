import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vindications-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() vindications: any;

  constructor() { }

  ngOnInit() {
  }

}
