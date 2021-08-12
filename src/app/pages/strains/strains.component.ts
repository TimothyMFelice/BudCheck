import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CreateStrainComponent } from 'src/app/tools/create-strain/create-strain.component';

@Component({
  selector: 'app-strains',
  templateUrl: './strains.component.html',
  styleUrls: ['./strains.component.css']
})
export class StrainsComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  strains: StrainData[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.firestore.getCollection(
      {
        path: ["Strains"],
        where: [
          new OrderBy("title", "desc"),
          new Limit(10)
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let strain = <StrainData>doc.data();
              strain.strainId = doc.id;
              this.strains.push(strain);
            }
          );
        },
        onFail: (err) => {

        }
      }
    );
  }

  onCreateStrainClick() {
    this.dialog.open(CreateStrainComponent);
  }
}

export interface StrainData {
  description: string;
  image?: string;
  title: string;
  strainId: string;
}