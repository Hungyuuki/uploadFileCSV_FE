import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';
import {error} from 'protractor';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  category: Category = {};

  formCreateCategory: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
  }

  getIdControl() {
    return this.formCreateCategory.get('id');
  }

  getNameControl() {
    return this.formCreateCategory.get('name');
  }

  createCategory(formCreateCategory) {
    if (this.formCreateCategory.valid) {
      this.categoryService.createCategoryService(this.formCreateCategory.value).subscribe(() =>{
        alert('tao thanh cong')
        this.router.navigate(['/categories']);
        formCreateCategory.reset;
      }, error =>{
        console.log(error);
      });
    } else {
      alert('tao moi khong thanh cong!')
    }
  }
}
