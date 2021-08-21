import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StarService } from '../star.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {

  @Input() userId;
  @Input() productId;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService) { }

  ngOnInit(): void {
    this.stars = this.starService.getProductStars(this.productId);

    this.avgRating = this.stars.pipe(map(arr => { 
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    }))
  }

  starHandler(value) {
    this.starService.setStar(this.userId, this.productId, value);
  }
}
