import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {};
id: number;
  productForm: FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) =>{
      this.id = +paramMap.get('id');
      this.getProductById(this.id);
    })
  }

  ngOnInit() {
  }
  get idControl() {
    return this.productForm.get('id');
  }

  get nameControl() {
    return this.productForm.get('name');
  }

  get priceControl() {
    return this.productForm.get('price');
  }

  get descriptionControl() {
    return this.productForm.get('description');
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(product =>{
      this.idControl.setValue(product.id);
      this.nameControl.setValue(product.name);
      this.priceControl.setValue(product.price);
      this.descriptionControl.setValue(product.description);
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id).subscribe(() =>{
      alert('xoa thanh cong');
      this.router.navigate(['/products']);
    });
  }
}
