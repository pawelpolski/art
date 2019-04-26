import { Injectable } from '@angular/core';
import { Workorder } from '../models/Workorder'
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkordersService {

  workordersCollection: AngularFirestoreCollection<Workorder>;
  workorderDocument: AngularFirestoreDocument<Workorder>;
  
  UserCollection: AngularFirestoreCollection<any>;
  Users: Observable<any[]>;
  User: Observable<any>;

  constructor(private afs: AngularFirestore) {
  }

  getData(queryData: any, company: string): Observable<Workorder[]> {
    this.workordersCollection = null;
    console.log(company);

    // GET ALL DOCS WITH THIS STATUS AT SPECIFIC DATE
    if (queryData.location === 'ALL') {
      if (company === 'upc') {
        this.workordersCollection = this.afs.collection('workorders', (ref) => ref
          .where('status', '==', queryData.status)
          .where('date', '>=', queryData.startingDate)
          .where('date', '<=', queryData.endingDate).orderBy('date'));
      } else if (company === 'netia') {
        this.workordersCollection = this.afs.collection('workordersNETIA', (ref) => ref
          .where('status', '==', queryData.status)
          .where('date', '>=', queryData.startingDate)
          .where('date', '<=', queryData.endingDate).orderBy('date'));
      } else if (company === 'orange') {
        this.workordersCollection = this.afs.collection('workordersORANGE', (ref) => ref
          .where('status', '==', queryData.status)
          .where('date', '>=', queryData.startingDate)
          .where('date', '<=', queryData.endingDate).orderBy('date'));
      }
      // GET ALL DOCS FOR PERSON WITH THIS STATUS AT SPECIFIC DATE
    } else {
      if (company === 'upc') {
        this.workordersCollection = this.afs.collection('workorders', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('status', '==', queryData.status)
          .where('date', '>=', queryData.startingDate)
          .where('date', '<=', queryData.endingDate).orderBy('date'));
      } else if (company === 'netia') {
        this.workordersCollection = this.afs.collection('workordersNETIA', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('status', '==', queryData.status)
          .where('date', '>=', queryData.startingDate)
          .where('date', '<=', queryData.endingDate).orderBy('date'));
      } else if (company === 'orange') {
        this.workordersCollection = this.afs.collection('workordersORANGE', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('status', '==', queryData.status)
          .where('date', '>=', queryData.startingDate)
          .where('date', '<=', queryData.endingDate).orderBy('date'));
      }
    }

    return this.workordersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }


  getDataSpecial_1(queryData: any, company: string): Observable<Workorder[]> {
    this.workordersCollection = null;
    console.log(company);

    // GET ALL DOCS CLOSED THIS MONTH
    if (queryData.location === 'ALL') {
      if (company === 'upc') {
        this.workordersCollection = this.afs.collection('workorders', (ref) => ref
          .where('status', '==', queryData.status)
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      } else if (company === 'netia') {
        this.workordersCollection = this.afs.collection('workordersNETIA', (ref) => ref
          .where('status', '==', queryData.status)
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      } else if (company === 'orange') {
        this.workordersCollection = this.afs.collection('workordersORANGE', (ref) => ref
          .where('status', '==', queryData.status)
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      }
      // GET ALL DOCS CLOSED THIS MONTH FOR PERSON
    } else {
      if (company === 'upc') {
        this.workordersCollection = this.afs.collection('workorders', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('status', '==', queryData.status)
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      } else if (company === 'netia') {
        this.workordersCollection = this.afs.collection('workordersNETIA', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('status', '==', queryData.status)
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      } else if (company === 'orange') {
        this.workordersCollection = this.afs.collection('workordersORANGE', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('status', '==', queryData.status)
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      }
    }

    return this.workordersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getDataSpecial_2(queryData: any, company: string): Observable<Workorder[]> {
    this.workordersCollection = null;
    console.log(company);

    // GET ALL DOCS checked
    if (queryData.location === 'ALL') {
      if (company === 'upc') {
        if (queryData.sended === false) {
          this.workordersCollection = this.afs.collection('workorders', (ref) => ref
            .where('checked', '==', queryData.checked)
            .where('status', '==', queryData.status)
            .where('sended', '==', false)
            .where('wo_type', '==', 'Instalacja')
            .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
        } else {
          this.workordersCollection = this.afs.collection('workorders', (ref) => ref
            .where('checked', '==', queryData.checked)
            .where('status', '==', queryData.status)
            .where('wo_type', '==', 'Instalacja')
            .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
        }
      } else if (company === 'netia') {
        this.workordersCollection = this.afs.collection('workordersNETIA', (ref) => ref
          .where('checked', '==', queryData.checked)
          .where('status', '==', queryData.status)
          .where('wo_type', '==', 'Instalacja')
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      } else if (company === 'orange') {
        this.workordersCollection = this.afs.collection('workordersORANGE', (ref) => ref
          .where('checked', '==', queryData.checked)
          .where('status', '==', queryData.status)
          .where('wo_type', '==', 'Instalacja')
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      }
      // GET ALL DOCS CLOSED checked FOR PERSON
    } else {
      if (company === 'upc') {
        this.workordersCollection = this.afs.collection('workorders', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('checked', '==', queryData.checked)
          .where('status', '==', queryData.status)
          .where('wo_type', '==', 'Instalacja')
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      } else if (company === 'netia') {
        this.workordersCollection = this.afs.collection('workordersNETIA', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('checked', '==', queryData.checked)
          .where('status', '==', queryData.status)
          .where('wo_type', '==', 'Instalacja')
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      } else if (company === 'orange') {
        this.workordersCollection = this.afs.collection('workordersORANGE', (ref) => ref
          .where('locations', 'array-contains', queryData.location)
          .where('checked', '==', queryData.checked)
          .where('status', '==', queryData.status)
          .where('wo_type', '==', 'Instalacja')
          .where('monthAndYear', '==', queryData.monthAndYear).orderBy('date'));
      }
    }

    return this.workordersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getWorkordersByWoOrId(search, company): Observable<Workorder[]> {
    this.workordersCollection = null;

    if (company === 'netia') {
      this.workordersCollection = this.afs.collection('workordersNETIA', (ref) => ref
        .where('client', '==', search).orderBy('date'));
    } else if (company === 'upc') {
      this.workordersCollection = this.afs.collection('workorders', (ref) => ref
        .where('wo', '==', search).orderBy('date'));
    } else {
      this.workordersCollection = this.afs.collection('workordersORANGE', (ref) => ref
        .where('wo', '==', search).orderBy('date'));
    }

    return this.workordersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getWorkordersByTag(search, company): Observable<Workorder[]> {
    this.workordersCollection = null;

      this.workordersCollection = this.afs.collection('tags', (ref) => ref
      .where('tags', 'array-contains', search).where('company', '==', company));

    return this.workordersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }


  getWorkorder(id: string, company: string) {
    console.log(company);
    if (company === 'upc') {
      return this.afs.doc<Workorder>(`workorders/${id}`);
    } else if (company === 'netia') {
      return this.afs.doc<Workorder>(`workordersNETIA/${id}`);
    } else {
      return this.afs.doc<Workorder>(`workordersORANGE/${id}`)
    }
  };



  saveWorkorder(workorder: Workorder, company) {
    const year = workorder.date.getFullYear();
    const month = workorder.date.getMonth() + 1;
    const day = workorder.date.getDate();
    const newDate = day + "." + month + "." + year;

    if (company === 'netia') {
      //workorder.wo_id = workorder.client + '_' + newDate + '_' + workorder.wo_netia;
      return this.afs.collection('workordersNETIA').doc(workorder.wo_id).set(workorder, { merge: true });

    } else if (company === 'upc') {
      //workorder.wo_id = workorder.wo + '_' + newDate;
      return this.afs.collection('workorders').doc(workorder.wo_id).set(workorder, { merge: true });

    } else {
     // workorder.wo_id = workorder.wo + '_' + newDate + '_' + workorder.client;
      return this.afs.collection('workordersORANGE').doc(workorder.wo_id).set(workorder, { merge: true });
    }
  }

  addFile(workorder: Workorder, company, file) {
    if (company === 'netia') {
      return this.afs.collection('workordersNETIA').doc(workorder.wo_id).set({ files: firebase.firestore.FieldValue.arrayUnion(file), operation:'Dodanie pliku'}, { merge: true });

    } else if (company === 'upc') {
      return this.afs.collection('workorders').doc(workorder.wo_id).set({ files: firebase.firestore.FieldValue.arrayUnion(file), operation:'Dodanie pliku'}, { merge: true });

    } else {
      return this.afs.collection('workordersORANGE').doc(workorder.wo_id).set({ files: firebase.firestore.FieldValue.arrayUnion(file), operation:'Dodanie pliku' }, { merge: true });
    }
  }


  saveWorkorderActivation(workorder: Workorder) {

      return this.afs.collection('workordersNETIA').doc(workorder.wo_id).set(workorder, { merge: true });

  }



  getClientHistory(client, company) {
    if (company === 'upc') {
      return this.afs.doc<any>(`clientHistoryUPC/${client}`);
    } else if (company === 'netia') {
      return this.afs.doc<any>(`clientHistoryNETIA/${client}`);
    } else {
      return this.afs.doc<any>(`clientHistoryORANGE/${client}`);
    }
  }



  setDayBeforeToday() {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    return new Date(year, month, day - 1, 0, 0, 0);
  }

  convertDateToMonth(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    let fullMonthAndYear = '';

    switch (month) {
      case 0: {
        fullMonthAndYear = 'Styczeń ' + year;
        break;
      }
      case 1: {
        fullMonthAndYear = 'Luty ' + year;
        break;
      }
      case 2: {
        fullMonthAndYear = 'Marzec ' + year;
        break;
      }
      case 3: {
        fullMonthAndYear = 'Kwiecień ' + year;
        break;
      }
      case 4: {
        fullMonthAndYear = 'Maj ' + year;
        break;
      }
      case 5: {
        fullMonthAndYear = 'Czerwiec ' + year;
        break;
      }
      case 6: {
        fullMonthAndYear = 'Lipiec ' + year;
        break;
      }
      case 7: {
        fullMonthAndYear = 'Sierpień ' + year;
        break;
      }
      case 8: {
        fullMonthAndYear = 'Wrzesień ' + year;
        break;
      }
      case 9: {
        fullMonthAndYear = 'Październik ' + year;
        break;
      }
      case 10: {
        fullMonthAndYear = 'Listopad ' + year;
        break;
      }
      case 11: {
        fullMonthAndYear = 'Grudzień ' + year;
        break;
      }
    }
    return fullMonthAndYear;
  }


  getworksToRemoveByLocation(location, month): AngularFirestoreCollection<Workorder> {
    if (location === 'ALL') {
      return this.workordersCollection = this.afs.collection('workorders', ref =>
        ref.where('toRemove', '==', true).where('removedInMonth', '==', month)
      );
    } else {
      return this.workordersCollection = this.afs.collection('workorders', ref =>
        ref.where('toRemove', '==', true).where('location', '==', location).where('removedInMonth', '==', month)
      );
    }
  }

  getUserUid(name): Observable<any> {
    // Get User with document id
    this.Users = this.afs.collection('users', ref => ref.where('name', '==', name))
    .snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { user_id: a.payload.doc.id, ...data };
        });
      })
    );
     
    return this.Users;
  }



  saveSallaryToUser(user, data, company){
    if(data.company === 'upc'){
      
    return this.afs.collection('users').doc(user.user_id).collection('sallary').doc(data.monthAndYear).set(data, { merge: true });

    } else {
      return this.afs.collection('users').doc(user.user_id).collection('sallary').doc(data.monthAndYear+"_"+company).set(data, { merge: true });

    }
  }




  // WINDYKACJE ---------------------

  addVindications(data){
    const year = data.date.getFullYear();
    const month = data.date.getMonth() + 1;
    const day = data.date.getDate();
    const newDate = day + "." + month + "." + year;
    data.wo_id = data.wo+'_'+data.client+'_'+newDate;
    return this.afs.collection('workorders').doc(data.wo_id).set(data, { merge: true });
  }

  getVindications(monthAndYear, done): Observable<any> {
    let vindicationsCollection: AngularFirestoreCollection<any> = null;

      vindicationsCollection = this.afs.collection('workorders', (ref) => ref
      .where('wo', '==', monthAndYear).where('status', '==', 'Przydzielono do technika').orderBy('location'));
    console.log(vindicationsCollection);
    return vindicationsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          console.log(data);
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getLastFiles(): Observable<any[]> {
    

    let files: AngularFirestoreCollection<any> = this.afs.collection('files', (ref) => ref
    .orderBy('date', 'desc').limit(10));


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
