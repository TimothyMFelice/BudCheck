import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ApiService } from 'src/app/shared/api/api.service';
import { Rating } from 'src/app/shared/rating/rating.model';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private api: ApiService, private storage: AngularFireStorage) {}

  rateProduct(rating: Rating, imagefile: File) {
    const ratingId = this.createNewId();

    const file = imagefile;
    const filePath = `ratings/${ratingId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task.then(() => {
      const downloadURL = fileRef.getDownloadURL();
      downloadURL.subscribe((url) => {
        rating.imageURL = url;
        return this.api.rateProduct(rating, ratingId);
      });
    });
  }

  createNewId() {
    return this.api.createNewId();
  }
}
