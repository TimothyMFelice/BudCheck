import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() productPayLoad: any;
  productData: any;

  productId: string;
  userId: string;

  authState: any = null;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.productData = this.productPayLoad.payload.doc.data();
    this.productId = this.productPayLoad.payload.doc.id;

    this.auth.authState.subscribe(authState => {
      this.authState = authState;
      this.userId = this.isAuthenticated ? this.authState.uid : null;
    });
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  } 
  
  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }
}
