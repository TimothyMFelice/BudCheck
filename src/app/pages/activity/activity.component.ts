import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/tools/product/product.model';
import { RatingService } from 'src/app/tools/rating/rating.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  products: Array<any>;

  ratings: Array<any>;

  constructor(private afs: AngularFirestore, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.getGlobalActivity();
  }

  getGlobalActivity() {
    this.ratingService.getGlobalRatings().then((querySnapshot) => {
      this.ratings = querySnapshot.docs;
    });
  }
}
