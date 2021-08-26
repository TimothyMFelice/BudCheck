import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss']
})
export class ActivityFeedComponent implements OnInit {

  ratingsDocs: Array<any>;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getAllRatings();
  }

  getAllRatings() {
    this.activityService.getAllRatings().subscribe(result => {
      this.ratingsDocs = result;
    });
  }
}
