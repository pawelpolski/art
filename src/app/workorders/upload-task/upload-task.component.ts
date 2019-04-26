import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() workorder: any;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore,
    private toastrService: ToastrService, ) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    let fileName = '';
    let extension = '';
    let fullName = '';

    if (this.file) {
      extension = this.file.name.split('.').pop();
      fileName = this.workorder.wo + '_' + this.workorder.client + '_' + Date.now();
      fullName = fileName + '.' + extension.toLowerCase();
    }
    
    // The storage path
    const path = '/workorders/' + this.workorder.monthAndYear + '/' + this.workorder.wo_id + '/' + fullName;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection('files').doc(this.workorder.wo_id).set({ wo_id: this.workorder.wo_id, date: new Date(), files: firebase.firestore.FieldValue.arrayUnion({ fullName: fullName, downloadURL: this.downloadURL, path: path, date: new Date(), monthAndYear: this.workorder.monthAndYear })}, { merge: true });
        this.toastrService.info(' ', 'Dodano plik',  {
          timeOut: 2000
        });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}