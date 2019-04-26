import { Component, OnInit, Input } from '@angular/core';
import { WorkordersService } from '../../workorders.service';
import { MemoriesService } from '../../memories.service';

@Component({
  selector: 'single-memories',
  templateUrl: './single-memories.component.html',
  styleUrls: ['./single-memories.component.scss']
})
export class SingleMemoriesComponent implements OnInit {
  @Input() mem: any;
  @Input() loggedUserIn: any;

  constructor(
    private workordersService: WorkordersService,
    private memoriesService: MemoriesService,) { }

  ngOnInit() {
    console.log(this.mem)
  }

  removeMem(){
    if (confirm("Usunąć wpis w memorkach?")) {
    this.memoriesService.removeMemories(this.mem.id)
    }
  }

}
