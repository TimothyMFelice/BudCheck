import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
  }

  private setUpForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cannabisType: ['', [Validators.required]],
      thc: ['', [Validators.required]],
      cbd: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get name() {
    return this.productForm.get('name');
  }
  get description() {
    return this.productForm.get('description');
  }
  get cannabisType() {
    return this.productForm.get('cannabisType');
  }
  get thc() {
    return this.productForm.get('thc');
  }
  get cbd() {
    return this.productForm.get('cbd');
  }
  get image() {
    return this.productForm.get('image');
  }

  createProduct(imageInput: HTMLInputElement) {
    this.productService.createProduct(imageInput.files![0], {
      displayName: this.name.value,
      description: this.description.value,
      cannabisType: this.cannabisType.value,
      thc: this.thc.value,
      cbd: this.cbd.value,
      imageURL: '',
      brandId: '4OgeGwx9kXBj49dDf7tX',
    });
  }
}
