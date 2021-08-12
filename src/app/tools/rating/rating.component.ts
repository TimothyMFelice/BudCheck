import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  firestore = new FirebaseTSFirestore();

  constructor(@Inject(MAT_DIALOG_DATA) private strainId: string, private dialog: MatDialogRef<RatingComponent>) { }

  ngOnInit(): void {
  }

  onSendClick(value: number) {
    this.firestore.create(
      {
        path: ["Rating"],
        data: {
          strainId: this.strainId,
          userId: AppComponent.getUserDocument().userId,
          value: value
        },
        onComplete: (docId) => {
          this.dialog.close();
        }
      }
    );
  }
}
