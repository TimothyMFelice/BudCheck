import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { StrainData } from 'src/app/pages/strains/strains.component';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-strain',
  templateUrl: './strain.component.html',
  styleUrls: ['./strain.component.css']
})
export class StrainComponent implements OnInit {

  @Input() strainData: StrainData;

  strainName: string;
  strainDescription: string;

  ratings: RatingData[] = [];
  avgRating: any = 'Not Reviewed';

  firestore = new FirebaseTSFirestore();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStrainInfo();
    this.getRating();
  }

  getStrainInfo() {
    this.firestore.getDocument(
      {
        path: ["Strains", this.strainData.strainId],
        onComplete: result => {
          let userDocument = result.data();
          this.strainName = userDocument.title;
          this.strainDescription = userDocument.description;
        }
      }
    );
  }

  getRating() {
    this.firestore.listenToCollection(
      {
        name: "Post Rating",
        path: ["Rating"],
        where: [new Where("strainId", "==", this.strainData.strainId)],
        onUpdate: (result) => {
          result.docChanges().forEach(
            strainDoc => {
              //console.log(strainDoc);
              if (strainDoc.type == 'added') {
                this.ratings.unshift(<RatingData>strainDoc.doc.data());
                this.avgRating = this.ratings.length ? this.calculateAverage(this.ratings).toFixed(1) : 'Not Reviewed';
              }
            }
          )
        }
      }
    );
  }

  onRatingClick() {
    this.dialog.open(RatingComponent, { data: this.strainData.strainId });
  }

  calculateAverage(array: any[]) {
    var total = 0;
    var count = 0;

    array.forEach(star => {
      total += star.value;
      count++;
    });

    return total / count;
  }
}

export interface RatingData {
  userId: any;
  strainId: any;
  value: number;
}