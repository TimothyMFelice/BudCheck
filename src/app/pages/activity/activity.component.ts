import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/tools/api/api.service';
import { Product } from 'src/app/tools/product/product.model';
import { RatingService } from 'src/app/tools/rating/rating.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  products: Array<any>;

  ratingsDocs: Array<any>;

  constructor(private afs: AngularFirestore, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getGlobalActivity();
  }

  getGlobalActivity() {
    this.apiService.getAllRatings().then((querySnapshot) => {
      this.ratingsDocs = querySnapshot.docs;
    });
  }
}
