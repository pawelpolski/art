import { Injectable } from '@angular/core';
import { Workorder } from '../models/Workorder'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CpesService {

  activationsCollection: AngularFirestoreCollection<any>;
  activationsDocument: AngularFirestoreDocument<any>;
  Activations: Observable<any[]>;
  Activation: Observable<any>;

  cpesCollection: AngularFirestoreCollection<any>;
  CpeDocument: AngularFirestoreDocument<any>;
  Cpes: Observable<any[]>;
  Cpe: Observable<any>;

  constructor(private afs: AngularFirestore) {
  }

  getCpeHistoryBySn(search, company): Observable<any[]> {
    this.cpesCollection = null;

    if (company === 'netia') {
      this.cpesCollection = this.afs.collection('cpeNETIA').doc(search).collection('history', (ref) => ref
        .orderBy('date'));
    } else if (company === 'upc') {
      this.cpesCollection = this.afs.collection('cpe').doc(search).collection('history', (ref) => ref
        .orderBy('date'));
    } else {
      this.cpesCollection = this.afs.collection('cpeORANGE').doc(search).collection('history', (ref) => ref
        .orderBy('date'));
    }

    return this.cpesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { sn: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getCpe(sn: string, company: string) {
    console.log(company, sn);
    if (company === 'upc') {
      return this.afs.doc<any>(`cpe/${sn}`);
    } else if (company === 'netia') {
      return this.afs.doc<any>(`cpeNETIA/${sn}`);
    } else {
      return this.afs.doc<any>(`cpeORANGE/${sn}`);
    }
  };

  getCpesForEachTech(location, company): Observable<any[]> {
    this.cpesCollection = null;

    if (company === 'netia') {
      this.cpesCollection = this.afs.collection('cpeNETIA', ref => ref.where('location', '==', location).orderBy('type'))
    } else if (company === 'upc') {
      this.cpesCollection = this.afs.collection('cpe', ref => ref.where('location', '==', location).orderBy('type'))
    } else {
      this.cpesCollection = this.afs.collection('cpeORANGE', ref => ref.where('location', '==', location).orderBy('type'))
    }

    return this.cpesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );

  }

  newCpeActivation(workorder: Workorder, principal, company) {
    let activation = {
      wo_id: workorder.wo_id,
      wo: workorder.wo,
      client: workorder.client,
      activated: false,
      principal: principal,
      cpe: workorder.equipments,
      date: new Date(),
      activatedBy: '',
      company: company,
    };

    return this.afs.collection('cpeActivations').doc(workorder.wo_id).set(activation, { merge: true });
  }

  newDzierzawa(workorder: Workorder, principal, company) {
    let activation = {
      wo_id: workorder.wo_id,
      wo: workorder.wo,
      client: workorder.client,
      activated: false,
      principal: principal,
      cpe: "Proszę odnowić dzierżawę", 
      date: new Date(),
      activatedBy: '',
      company: company,
    };

    return this.afs.collection('cpeActivations').doc(workorder.wo_id).set(activation, { merge: true });
  }


  changeCpeActivationStatus(workorder: Workorder, activatedBy) {
    return this.afs.collection('cpeActivations').doc(workorder.wo_id).set({ activatedBy: activatedBy, activationDate: new Date(), activated: true }, { merge: true });
  }

  getRecentActivations(): Observable<any[]> {
    this.activationsCollection = null;

    this.activationsCollection = this.afs.collection('cpeActivations', (ref) => ref
          .where('activated', '==', false).orderBy('date'));
     

    return this.activationsCollection.snapshotChanges().pipe(
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
