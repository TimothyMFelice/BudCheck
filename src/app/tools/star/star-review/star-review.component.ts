import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StarService } from '../star.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../authenticator/auth.service';
import { Star } from '../star.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {

  @Input() productId;

  starsDoc: Observable<any>;
  usersName: string[] = [];
  productsName: string[] = [];

  avgRating: Observable<any>;

  authState: any = null;
  userId: any;

  constructor(public afs: AngularFirestore, public starService: StarService, private authService: AuthService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.starsDoc = this.starService.getProductStars(this.productId);

    this.starsDoc.subscribe(starDoc => {
      starDoc.forEach(star => {
        this.authService.getUser(star.userId).subscribe(user => {
          this.usersName.push(user.displayName ? user.displayName : 'User');
        });
        this.authService.getProduct(star.productId).subscribe(product => {
          this.productsName.push(product.displayName ? product.displayName : 'Product');
        });
      })
    });

    this.avgRating = this.starsDoc.pipe(map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    }))
  }

  starHandler(value) {
    this.starService.setStar(this.userId, this.productId, value);
  }

  getStar(id: string): Observable<Star[]> {
    const starsDocuments = this.afs.collection<Star[]>('stars');
    return starsDocuments.snapshotChanges()
      .pipe(
        map(changes => changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id
          return { id, ...data };
        })),
        map((products) => products.find(doc => doc.id === id)))
  }
}
