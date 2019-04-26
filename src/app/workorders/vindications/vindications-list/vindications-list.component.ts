import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vindications-lists',
  templateUrl: './vindications-list.component.html',
  styleUrls: ['./vindications-list.component.scss']
})
export class VindicationsListComponent implements OnInit {
  @Input() vindications: any; 
  
  constructor() { }

  ngOnInit() {
  }

}
