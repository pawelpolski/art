import { Injectable } from '@angular/core';
import { Workorder } from '../models/Workorder'
import { User } from '../models/User'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NeededDataService {

  usersCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;
  codesValuesCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {

  }

  getNeededData() {
    return this.afs.doc<any>('aggregations/neededData');
  };

  getUsers(): Observable<any> {
    this.usersCollection = null;

      this.usersCollection = this.afs.collection('users');

    return this.usersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getCodesValues(): Observable<any> {
    this.codesValuesCollection = null;

      this.codesValuesCollection = this.afs.collection('codesValues');

    return this.codesValuesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }
}
