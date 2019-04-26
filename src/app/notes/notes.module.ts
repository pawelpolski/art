import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesService } from './notes.service';
import { Material } from '../material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Material,
  ],
  declarations: [NotesListComponent, NoteDetailComponent],
  providers: [NotesService]
})
export class NotesModule { }
