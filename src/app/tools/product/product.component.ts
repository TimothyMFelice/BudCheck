import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() productDoc: any;
  productData: any;

  productId: string;
  userId: string;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.productData = this.productDoc.data();
    this.productId = this.productDoc.id;
  }
}
