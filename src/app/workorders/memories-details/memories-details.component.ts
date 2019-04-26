import { Component, OnInit, Input } from '@angular/core';
import { MemoriesService } from '../memories.service';

@Component({
  selector: 'memories-details',
  templateUrl: './memories-details.component.html',
  styleUrls: ['./memories-details.component.scss']
})
export class MemoriesDetailsComponent implements OnInit {

  @Input() memo: any;
  @Input() loggedUserIn: any;

  constructor(
    private memoriesService: MemoriesService,
    ) { }

  ngOnInit() {
  }

  setAsDone(id){
    this.memoriesService.setMemAsDone(id, this.loggedUserIn.name)
    .then(res => {
      console.log('ok');
    })
    .catch(res => {
      console.log('error');
    });
  }

  setAsDoneWo(id){
    if (confirm("Oznaczyć jako załatwione + usunąć z tej listy?")) {
    this.memoriesService.setMemAsDoneWo(id, this.loggedUserIn.name)
    .then(res => {
      console.log('ok');
    })
    .catch(res => {
      console.log('error');
    });
  }
  }

  readMem(id){
    this.memoriesService.readMem(id, this.loggedUserIn.name)
    .then(res => {
      console.log('ok');
    })
    .catch(res => {
      console.log('error');
    });
  }

  setAsToDo(id){
    this.memoriesService.setMemAsToDo(id, this.loggedUserIn.name)
    .then(res => {
      console.log('ok');
    })
    .catch(res => {
      console.log('error');
    });
  }
  
  addComment(id){

    let description = prompt("Dodaj komentarz... ", "");

    if (description == null || description == "") {
    } else {
      this.memoriesService.addComment(id, description, this.loggedUserIn.name, this.loggedUserIn.icon)
      .then(res => {
        console.log('ok');
      })
      .catch(res => {
        console.log('error');
      });
    }
  }

  addWoId(id){

    let wo_id = prompt("Dodaj wo_id... ", "");

    if (wo_id == null || wo_id == "") {
    } else {
      this.memoriesService.addWoId(id, wo_id)
      .then(res => {
        console.log('ok');
      })
      .catch(res => {
        console.log('error');
      });
    }
  }

  removeComment(id, info){
    console.log(id, info);
    
      this.memoriesService.removeComment(id, info)
      .then(res => {
        console.log('ok');
      })
      .catch(res => {
        console.log('error');
      });
    
  }


  removeMem(id){
    if (confirm("Usunąć wpis w memorkach?")) {
    this.memoriesService.removeMemories(id)    
    .then(res => {
      console.log('ok');
    })
    .catch(res => {
      console.log('error');
    });
    }
  }




}
