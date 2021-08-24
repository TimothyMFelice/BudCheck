import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/tools/product/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  selectedImageFile!: File;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onProductCreate(displayNameInput: HTMLInputElement, descriptionInput: HTMLTextAreaElement, cannabisTypeInput: HTMLInputElement, thcInput: HTMLInputElement, cbdInput: HTMLInputElement, imageInput: HTMLInputElement) {
    /* if (displayNameInput.value.length <= 0 ||
      descriptionInput.value.length <= 0 ||
      cannabisTypeInput.value.length <= 0 ||
      thcInput.value.length <= 0 ||
      cbdInput.value.length <= 0 ||
      imageInput.value.length <= 0) {
      console.error("ONE OF THE INPUTS ARE NOT THERE");
    } */

    let newDisplayName = displayNameInput.value;
    let newDescription = descriptionInput.value;
    let newCannabisType = cannabisTypeInput.value;
    let newTHC = thcInput.value;
    let newCBD = thcInput.value;
    console.log(newDisplayName, newDescription, newCannabisType, newTHC, newCBD)

    const productId = this.afs.createId();



    const file = imageInput.files![0];
    const filePath = `flowers/${productId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.then(() => {
      const downloadURL = fileRef.getDownloadURL();
      downloadURL.subscribe(url => {
        if (url) {
          const productRef: AngularFirestoreDocument<any> = this.afs.doc(`flowers/${productId}`);
          const productState: Product = {
            displayName: newDisplayName,
            description: newDescription,
            cannabisType: newCannabisType,
            thc: parseFloat(newTHC),
            cbd: parseFloat(newCBD),
            imageURL: url,
            brandId: "4OgeGwx9kXBj49dDf7tX"
          }
          productRef.set(productState, { merge: true })
        }
      })
    });
  }
}
