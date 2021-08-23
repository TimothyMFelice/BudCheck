import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/tools/api/api.service';

@Component({
  selector: 'app-global-activity-feed',
  templateUrl: './global-activity-feed.component.html',
  styleUrls: ['./global-activity-feed.component.scss']
})
export class GlobalActivityFeedComponent implements OnInit {

  ratingsDocs: Array<any>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getGlobalActivity();
  }

  getGlobalActivity() {
    this.apiService.getAllRatings().then((querySnapshot) => {
      this.ratingsDocs = querySnapshot.docs;
    });
  }
}
