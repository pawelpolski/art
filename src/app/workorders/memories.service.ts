import { Injectable } from '@angular/core';
import { Workorder } from '../models/Workorder'
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';


import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MemoriesService {

  memoriesCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  getMemoriesForWorkorder(workorder, company: string): Observable<any[]> {
    this.memoriesCollection = null;

    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
        .where('wo_id', '==', workorder.wo_id)
        .where('type', '==', 'wo_mem')
        .orderBy('lastChange'));


    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  
  getMemoriesForPerson(workorder, company: string): Observable<any[]> {
    this.memoriesCollection = null;

    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
        .where('wo_id', '==', workorder.wo_id)
        .where('type', '==', 'person')
        .orderBy('lastChange'));


    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getMemoriesForClient(workorder, company: string): Observable<any[]> {
    this.memoriesCollection = null;

    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
    .where('client', '==', workorder.client)
    .where('type', '==', 'client_mem')
        .orderBy('lastChange'));


    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  addMemForWoOrClient(workorder, desc, company, creator, icon, type) {

    return this.memoriesCollection.add(
      {
        wo: workorder.wo,
        type: type,
        wo_id: workorder.wo_id,
        client: workorder.client,
        lastChange: new Date(),
        change: new Date(),
        description: desc,
        company: company,
        creator: creator,
        icon: icon,
        done: false,
      });
    
  }

  addFullMem(desc, creator, icon, toBeDoneDate, person, type, wo_id, client, company) {
    const person_all = person;
    person_all.push(creator);
    person_all.push('Admin');
    const doneByPerson = [];
    const whoRead = [creator];

    return this.memoriesCollection.add(
      {
        wo_id: wo_id,
        client: client,
        type: type,
        lastChange: new Date(),
        change: new Date(),
        toBeDoneDate: this.changeDateHours(toBeDoneDate),
        description: desc,
        creator: creator,
        icon: icon,
        done: false,
        person: person_all,
        doneByPerson: doneByPerson,
        whoRead: whoRead,
        company: company
      });
  }

  storageRef(){
    return this.storage;
  }

  setMemAsDone(id, statusChanger) {
    return this.afs.doc<any>(`memories/${id}`).set(
      { doneByPerson: firebase.firestore.FieldValue.arrayUnion(statusChanger), change: new Date() },
      { merge: true }
    );
  }  
  
  setMemAsDoneWo(id, statusChanger) {
    return this.afs.doc<any>(`memories/${id}`).set(
      { doneByPerson: firebase.firestore.FieldValue.arrayUnion(statusChanger), change: new Date(), done: true, doneBy: statusChanger},
      
      { merge: true }
    );
  }

  readMem(id, statusChanger) {
    return this.afs.doc<any>(`memories/${id}`).set(
      { whoRead: firebase.firestore.FieldValue.arrayUnion(statusChanger), change: new Date() },
      { merge: true }
    );
  }

  setMemAsToDo(id, statusChanger) {
    return this.afs.doc<any>(`memories/${id}`).set(
      { doneByPerson: firebase.firestore.FieldValue.arrayRemove(statusChanger), change: new Date() },
      { merge: true }
    );
  }

  addComment(id, description, creator, icon) {
    return this.afs.doc<any>(`memories/${id}`).set(
      { comments: firebase.firestore.FieldValue.arrayUnion({ description: description, creator: creator, icon: icon }), change: new Date() },
      { merge: true });
  }

  addWoId(id, wo_id) {
    return this.afs.doc<any>(`memories/${id}`).set(
    { wo_id: wo_id, company: 'upc'},
      { merge: true });
  }

  removeComment(id, info) {
    return this.afs.doc<any>(`memories/${id}`).set(
      { comments: firebase.firestore.FieldValue.arrayRemove(info)},
      { merge: true });
  }

  removeMemories(id) {
    return this.memoriesCollection.doc(id).delete();
  }

  changeDateHours(date: Date) {

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return new Date(year, month, day, 23, 59, 59);
  }

  getLastMemoriesClient(): Observable<any[]> {
    this.memoriesCollection = null;

    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
      .where('type', '==', 'client_mem')
      .where('done', '==', false)
      
      .orderBy('lastChange', 'desc').limit(10));

    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getLastMemoriesWo(): Observable<any[]> {
    this.memoriesCollection = null;

    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
    .where('type', '==', 'wo_mem')
    .where('done', '==', false)
      .orderBy('lastChange', 'desc').limit(30));

    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getLastMemoriesAdmin(): Observable<any[]> {
    this.memoriesCollection = null;

    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
      .where('type', '==', 'admin')
      
    .where('done', '==', false)
      .orderBy('lastChange', 'desc').limit(50));

    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getFutureMemories(person): Observable<any[]> {
    this.memoriesCollection = null;

    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
    .where('toBeDoneDate', '>=', new Date())
    .where('type', '==', 'future')
    
    .where('done', '==', false)
    .where('person', 'array-contains', person)
      .orderBy('toBeDoneDate').limit(50));

    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getPersonMemories(person): Observable<any[]> {
    this.memoriesCollection = null;
    console.log('person:', person);
    this.memoriesCollection = this.afs.collection('memories', (ref) => ref
      .where('type', '==', 'person')
      
    .where('done', '==', false)
      .where('person', 'array-contains', person)
      .orderBy('lastChange', 'desc').limit(50));

    return this.memoriesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getFilesForWo(workorder): Observable<any[]> {
    

    let files: AngularFirestoreCollection<any> = this.afs.collection('files', (ref) => ref
    .where('wo_id', '==', workorder.wo_id));


    return files.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }



}
