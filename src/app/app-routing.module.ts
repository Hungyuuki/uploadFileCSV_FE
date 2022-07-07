import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductCreateComponent} from './product/product-create/product-create.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import {ProductDeleteComponent} from './product/product-delete/product-delete.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {CategoryCreateComponent} from './category/category-create/category-create.component';


const routes: Routes = [
  {
    path: `products`,
    component: ProductListComponent
  },
  {
    path: `products/create`,
    component: ProductCreateComponent
  },
  {
    path: `products/edit/:id`,
    component: ProductEditComponent
  },
  {
    path: `products/delete/:id`,
    component: ProductDeleteComponent
  },
  {
    path: `categories`,
    component: CategoryListComponent
  },
  {
    path: `categories/create`,
    component: CategoryCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
