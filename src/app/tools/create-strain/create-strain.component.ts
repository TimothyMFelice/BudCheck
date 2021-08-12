import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

@Component({
  selector: 'app-create-strain',
  templateUrl: './create-strain.component.html',
  styleUrls: ['./create-strain.component.css']
})
export class CreateStrainComponent implements OnInit {

  selectedImageFile!: File;

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();

  constructor(private dialog: MatDialogRef<CreateStrainComponent>) { }

  ngOnInit(): void {
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files![0];
    if (!this.selectedImageFile) return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener("loadend", ev => {
      let readableString = fileReader.result?.toString();
      let postPreviewImage = <HTMLInputElement>document.getElementById("strain-preview-image");
      postPreviewImage.src = <string>readableString;
    })
  }

  onStrainClick(titleInput: HTMLTextAreaElement, descInput: HTMLTextAreaElement) {
    let title = titleInput.value;
    let desc = descInput.value;
    if (title.length <= 0 || desc.length <= 0) return;

    if (this.selectedImageFile) {
      this.uploadImageStrain(title, desc);
    } else {
      this.uploadStrain(title, desc);
    }
  }

  uploadImageStrain(title: string, desc: string) {
    let strainId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Strain",
        path: ["Strains", strainId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create({
            path: ["Strains", strainId],
            data:
            {
              description: desc,
              imageUrl: downloadUrl,
              title: title
            },
            onComplete: (docId) => {
              this.dialog.close();
            }
          })
        }
      }
    );
  }

  uploadStrain(title: string, desc: string) {
    this.firestore.create({
      path: ["Strains"],
      data:
      {
        description: desc,
        title: title
      },
      onComplete: (docId) => {
        this.dialog.close();
      }
    })
  }
}
