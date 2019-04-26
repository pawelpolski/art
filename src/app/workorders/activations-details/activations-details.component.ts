import { Component, OnInit, Input } from '@angular/core';
import { CpesService } from '../cpes.service';
import { ToastrService } from 'ngx-toastr';
import { WorkordersService } from '../workorders.service';
import { DataTransferService } from '../../data-transfer.service';

@Component({
  selector: 'activations-details',
  templateUrl: './activations-details.component.html',
  styleUrls: ['./activations-details.component.scss']
})
export class ActivationsDetailsComponent implements OnInit {
  @Input() activation: any;

  loggedUserIn: any;

  workorder: any = {cpeActivated: true, operation: 'Aktywowanie sprzętu', wo_id: ''}; 

  constructor(private cpesService: CpesService,
    private toastrService: ToastrService,
    private workordersService: WorkordersService, 
    private dataService: DataTransferService,) { }

  ngOnInit() {
    this.dataService.loggedUserCurrent.subscribe(doc => {
      this.loggedUserIn = doc;
    });
  }


  setCpeAsActivated() {
    if (confirm("Oznaczyć jako aktywowane?")) {
      this.cpesService.changeCpeActivationStatus(this.activation, "Panel aktywacji")
        .then(res => {
          console.log('ok');
          this.toastrService.info('', 'Aktywowane',  {
            timeOut: 2000
          });
        })
        .catch(res => {
          console.log('error');
        });

      this.workorder.wo_id = this.activation.wo_id;
      this.workordersService.saveWorkorderActivation(this.workorder)
      .then(res => {
        this.toastrService.success('', 'Zapisano zlecenie',  {
          timeOut: 3000
        });
      })
      .catch(res => {
        console.log("Error: ", this.workorder)
      });
    }
  }


  copyValue(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.info(val, 'Skopiowano', {
      timeOut: 2000
    });
  }
}
