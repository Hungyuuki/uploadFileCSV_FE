import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {};
  category: Category = {};
  categories: Category[] = [];


  productForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categoryId: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    //avtivatedRoute lấy biến trên đường dẫn
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getProductById(id);
    });
  }


  ngOnInit() {
    this.getAllCategoryControl();
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

  get categoryIdControl() {
    return this.productForm.get('categoryId');
  }

  get categoryControl() {
    return this.productForm.get('category');
  }

  getAllCategoryControl() {
    this.categoryService.getAllCategoryService().subscribe((categoryForm) => {
      this.categories = categoryForm.content;
    });
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(productBe => {
      this.product = productBe;
      this.idControl.setValue(this.product.id);
      this.nameControl.setValue(this.product.name);
      this.priceControl.setValue(this.product.price);
      this.descriptionControl.setValue(this.product.description);
      this.categoryIdControl.setValue(this.product.category.id);
      this.categoryControl.setValue('');

    });
  }

  editProduct() {
    const category = this.productForm.value;
    this.productForm.patchValue({
      category: {
        id: category.categoryId,
        name: '',
      }
    });
    this.productService.editProduct(this.product.id, this.productForm.value).subscribe(() => {
      alert('sua thanh cong');
      this.router.navigate(['/products']);
    });
  }
}
