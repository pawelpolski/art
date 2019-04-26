import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MemoriesService } from '../memories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.scss']
})
export class FilesModalComponent implements OnInit {

  @Input() showForm: any;
  @Input() files: any;

  @Output() formStatus = new EventEmitter<any>();

  // files: any = [];

  constructor(
    private memoriesService: MemoriesService,
    private toastrService: ToastrService, 
  ) { }

  ngOnInit() {
    console.log(this.files[0].files);
  //  this.getLink(this.workorder);
  }

  closeForm() {
    this.showForm = !this.showForm;
    this.formStatus.emit(false);
  }

  // getLink(workorder) {
  //   if (workorder.files) {
  //     workorder.files.forEach(el => {
  //       this.memoriesService.storageRef().ref('/workorders/' + this.workorder.monthAndYear + '/' + this.workorder.wo_id + '/' + el).getDownloadURL().subscribe(link => {
  //         if (link) {
  //           this.files.push({ name: el, link: link });
  //         }
  //       })
  //     });
  //   }
  // }

  onNavigate(link) {
    window.open(link, "_blank");
  }

}
