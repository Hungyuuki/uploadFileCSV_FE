import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IncomeListComponent} from './income/income-list/income-list.component';
import {IncomeCreateComponent} from './income/income-create/income-create.component';
import {IncomeDeleteComponent} from './income/income-delete/income-delete.component';
import {IncomeUpdateComponent} from './income/income-update/income-update.component';



const routes: Routes = [
  { path: `incomes`,
    component: IncomeListComponent
  },
  {
    path: `incomes/create`,
    component: IncomeCreateComponent
  },
  {
    path: `incomes/update/:id`,
    component: IncomeUpdateComponent
  },
  {
    path: `incomes/delete/:id`,
    component: IncomeDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
