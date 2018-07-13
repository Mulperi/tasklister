import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
   title: string;
   description: string;
   done: boolean;
   urgent: boolean;
   priority: number;
  }

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  addingNewTask = false;

  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  private itemsCollection: AngularFirestoreCollection<any>;
  items;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('rooms/1/tasklist', ref => {
      return ref.orderBy('urgent', 'desc').limit(50);
    });
    // this.items = this.itemsCollection.valueChanges();

    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    // this.itemDoc = afs.doc<any>('rooms/1/tasklist/');
    // this.item = this.itemDoc.valueChanges();
  }

  ngOnInit() {
    // this.items.subscribe(data => console.log(data));
  }

  addItem(item: any) {
    this.itemsCollection.add(item);
    this.addingNewTask = !this.addingNewTask;
  }

  toggleDone(item: any) {
    this.afs.doc<any>(`rooms/1/tasklist/${item.id}`).update({ done: !item.done });
  }

  deleteItem(item: any) {
    this.afs.doc<any>(`rooms/1/tasklist/${item.id}`).delete();
  }

  toggleForm() {
    this.addingNewTask = !this.addingNewTask;
  }
}
