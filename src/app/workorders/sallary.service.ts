import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Workorder } from '../models/Workorder'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SallaryService {

  salaryDocument: AngularFirestoreDocument<any>;
  salaryCollection: AngularFirestoreCollection<any>;
  salary: Observable<any>;

  workorders: Observable<Workorder[]>;
  workorder: Observable<Workorder>;

  userCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
  }

  getAllUsers(): AngularFirestoreCollection<any> {
    return this.userCollection = this.afs.collection('users');
  }

  getAllUsersSallary(owner, month): AngularFirestoreDocument<any> {
    return this.salaryDocument = this.afs.collection('users').doc(owner).collection('sallary').doc(month);
  }

  getSalaryCollection(owner, month) {
    return this.salaryCollection = this.afs.collection('users').doc(owner).collection('sallary');
  }

  getSalary(owner, month) {
    return this.afs.doc<any>(`users/${owner}/sallary/${month}/`);

  }

  getSalaryNetia(owner, month) {
    return this.afs.doc<any>(`users/${owner}/sallary/${month}_netia/`);

  }

}
