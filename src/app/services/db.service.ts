import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public db: AngularFirestore) { }

  createQuery(value){
    return this.db.collection('queries').add({
      name: value.name,
      email: value.email,
      cell: value.cell,
      message: value.message,
      viewed: value.viewed
    });
  }
}
