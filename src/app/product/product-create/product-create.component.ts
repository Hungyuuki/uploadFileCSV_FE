import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {};
  categories: Category[]=[];
  imageFile: File;
  imageUrl: string;
  checkUploadImage = false;

  formCreateProduct: FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(12)]),
    price: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image: new FormControl(''),
    categoryId: new FormControl(''),
    category: new FormControl(''),
  });


  constructor(private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService,
              private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getAllCategoryControl();
  }

  get idCreateControl() {
    return this.formCreateProduct.get('id');
  }

  get nameCreateControl() {
    return this.formCreateProduct.get('name');
  }

  get priceCreateControl() {
    return this.formCreateProduct.get('price');
  }

  get descriptionCreateControl() {
    return this.formCreateProduct.get('description');
  }
  getAllCategoryControl() {
    this.categoryService.getAllCategoryService().subscribe((categoryForm) =>{
      this.categories = categoryForm.content;
    })
  }

  createProduct(formCreateProduct) {
    const category = this.formCreateProduct.value;
    this.formCreateProduct.patchValue({category: {
      id: category.categoryId,
        name: '',
      }});
    if (formCreateProduct.valid) {
      this.productService.createProduct(this.formCreateProduct.value).subscribe(() =>{
        alert('thanh cong!')
        this.router.navigate(['/products']);
        formCreateProduct.reset();
      }, error => console.log(error));
    } else {
      alert('tao khong thanh cong');
    }
  }
  changeFile($event) {
    this.checkUploadImage = true;
    this.imageFile = $event.target.files[0];
    console.log(this.imageFile);
    const nameImg = this.getCurrentDateTime() + this.imageFile.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageUrl = url;
          console.log(url)
          this.formCreateProduct.patchValue({image: url});
          this.checkUploadImage = false;
        });
      })
    ).subscribe();
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
