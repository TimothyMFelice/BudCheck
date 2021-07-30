import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData: PostData;
  creatorName: string;
  creatorDescription: string;
  firestore = new FirebaseTSFirestore();

  constructor() { }

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  getCreatorInfo() {
    console.log(this.postData.creatorId);
    this.firestore.getDocument(
      {
        path: ["Users", this.postData.creatorId],
        onComplete: result => {
          console.log(result);
          let userDocument = result.data();
          console.log(userDocument);
          this.creatorName = userDocument.publicName;
          this.creatorDescription = userDocument.description;
        }
      }
    );
  }

}
