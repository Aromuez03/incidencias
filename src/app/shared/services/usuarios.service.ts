import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'src/app/core/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  private coleccion: AngularFirestoreCollection = this.afb.collection('usuarios');
  private rolActual: string = '';

  constructor(
    private afb: AngularFirestore
  ) {
  }

  getAll() {
    return this.coleccion.snapshotChanges();
  }
  
  getOne(coleccion: string, documentId: string){
    return this.afb.collection(coleccion).doc(documentId).snapshotChanges();

  }

  getUser(mail: string | null) {

      return this.afb.collection('usuarios', ref => ref.where('email', "==", mail).limit(1)).valueChanges();

  }

  update(coleccion: string, documentId: string, data: any){
    return this.afb.collection(coleccion).doc(documentId).update(data);

  }

  delete(coleccion: string, documentId: string){
    return this.afb.collection(coleccion).doc(documentId).delete();
  }

  newUser(coleccion: string , data:any){
    return this.afb.collection(coleccion).add(data);
  }

  setRolActual(role: string) {
    this.rolActual = role;
  }

  getRolActual() {
    return this.rolActual;
  }

}
