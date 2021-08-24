import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/tools/api/api.service';

@Component({
  selector: 'app-product-feed',
  templateUrl: './product-feed.component.html',
  styleUrls: ['./product-feed.component.scss']
})
export class ProductFeedComponent implements OnInit {

  productsDocs: Array<any>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.apiService.getAllProducts().then((querySnapshot) => {
      this.productsDocs = querySnapshot.docs;
    });
  }
}
