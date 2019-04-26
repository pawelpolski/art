import { Component, OnInit } from '@angular/core';

import { CpesService } from '../cpes.service';

@Component({
  selector: 'activations-list',
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.scss']
})
export class ActivationsListComponent implements OnInit {
  activations: any = [];
  
  constructor(
    private cpesService: CpesService,) { }

  ngOnInit() {

    this.cpesService.getRecentActivations().subscribe(acti => {
      this.activations = acti;
    });
  }

}
