import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/tools/product/product.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  products: Array<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.afs.collection('flowers').snapshotChanges().subscribe(result => {
      this.products = result;
    });
  }
}
