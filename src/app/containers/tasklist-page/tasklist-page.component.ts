import { Item } from './../../models/item.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';

@Component({
  selector: 'app-tasklist-page',
  templateUrl: 'tasklist-page.component.html'
})
export class TasklistPageComponent implements OnInit {
  addingNewTask = false;
  new = { title: '', description: '', done: false, urgent: false, author: '' };
  room: string;

  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  private itemsCollection: AngularFirestoreCollection<any>;
  items;

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.itemDoc = afs.doc<any>('rooms/1/tasklist/');
    // this.item = this.itemDoc.valueChanges();
  }

  ngOnInit() {
    this.route.params
      .pipe(map((params: ParamMap) => params['room']))
      .subscribe(room => {
        this.room = room;
        this.itemsCollection = this.afs.collection<any>(
          `rooms/${room}/tasklist`,
          ref => {
            return ref.orderBy('urgent', 'desc').limit(50);
          }
        );
      });

    // this.items = this.itemsCollection.valueChanges();
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  addItem(author) {
    author.subscribe(data => {
      // console.log(data);
      this.new.author = data.displayName;
      this.itemsCollection.add(this.new);
      this.addingNewTask = !this.addingNewTask;
      this.new = {
        title: '',
        description: '',
        done: false,
        urgent: false,
        author: ''
      };
    });
  }

  onToggleDone(item: any) {
    this.afs
      .doc<any>(`rooms/${this.room}/tasklist/${item.id}`)
      .update({ done: !item.done });
  }

  onDelete(item: any) {
    this.afs.doc<any>(`rooms/${this.room}/tasklist/${item.id}`).delete();
  }

  toggleForm() {
    this.addingNewTask = !this.addingNewTask;
  }
}
