import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  indexPagination: number; //vi tri ttrang hien tai
  totalPagination: number; //tong so trang
  currentPagination: number; //trang hien tai
  constructor(private productService: ProductService) {
  }

  getAllProduct() {
    this.productService.getAll(0).subscribe((productsFromBE) => {
      this.products = productsFromBE.content;
      this.totalPagination =
        productsFromBE.totalPages;
      this.indexPagination = productsFromBE.pageable.pageNumber;
      this.currentPagination = this.indexPagination + 1;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getAllProduct();
  }


  first() {
    this.indexPagination = 0;
    this.currentPagination = 1;
    this.productService.getAll(this.indexPagination).subscribe((data) => {
      this.products = data.content;
    });
  }

  last() {
    this.indexPagination = this.totalPagination - 1;
    this.currentPagination = this.totalPagination;
    this.productService.getAll(this.indexPagination).subscribe((data) => {
      this.products = data.content;
    });
  }

  previous() {
    this.indexPagination = this.indexPagination - 1;
    this.currentPagination = this.currentPagination - 1;
    this.productService.getAll(this.indexPagination).subscribe((data) => {
      this.products = data.content;
    });
  };

  next() {
    this.indexPagination = this.indexPagination + 1;
    this.currentPagination = this.currentPagination + 1;
    this.productService.getAll(this.indexPagination).subscribe((data) => {
      this.products = data.content;
    });
  };
}
