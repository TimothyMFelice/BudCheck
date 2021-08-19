import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() ratingData: RatingData;
  ratingTitle: string;

  userName: string;
  productName: string;
  brandName: string;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.ratingTitle = "Name is puffing Product Name by Brand Name.";
    this.getCreatorInfo();
  }

  getCreatorInfo() {
    let userDoc = this.firestore.collection('Users').doc<UserData>(this.ratingData.userId);
    userDoc.valueChanges().subscribe(result => {
      this.userName = result.nickName;

      let strainDoc = this.firestore.collection('Strains').doc<StrainData>(this.ratingData.strainId);
      strainDoc.valueChanges().subscribe(result => {
        this.productName = result.name;
        this.ratingTitle = this.userName + " is puffing " + this.productName + " by " + this.brandName + ".";
      });
    });
  }
}

export interface UserData {
  bio: string;
  nickName: string;
}

export interface StrainData {
  brandId: string;
  cannabisType: string;
  cbd: string;
  description: string;
  imageUrl: string;
  name: string;
  productType: string;
  thc: string;
}

export interface RatingData {
  value: number;
  description: string;
  imageUrl: string;
  flavorTags: string;
  dispensaryId: string;
  strainId: string;
  userId: string;
  consumptionType: string;
  timeStamp: firebase.default.firestore.Timestamp;
  postId: string;
}