import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { RatingData } from 'src/app/tools/rating/rating.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  ratings: RatingData[] = [];

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit(): void {
    this.getActivity();
  }

  getActivity() {
    this.fireStore.collection<RatingData>('Ratings').valueChanges().subscribe(result => {
      result.forEach(rating => {
        this.ratings.push(rating);
      })
    });
  }
}
