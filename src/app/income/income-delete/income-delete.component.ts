import { Component, OnInit } from '@angular/core';
import {Income} from '../../model/Income';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IncomeService} from '../../service/income.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-income-delete',
  templateUrl: './income-delete.component.html',
  styleUrls: ['./income-delete.component.css']
})
export class IncomeDeleteComponent implements OnInit {
income: Income = {};
  id: number;
  formDeleteIncome: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    gender: new FormControl('', [Validators.required]),
    roll: new FormControl('', [Validators.required]),
    income: new FormControl('', [Validators.required]),
  });
  constructor(private incomeService: IncomeService,
              private router: Router,
              private activatedRoute: ActivatedRoute)  {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getIncomeById(this.id);
    });
  }

  ngOnInit() {
  }
  get idDelete() {
    return this.formDeleteIncome.get('id');
  }

  get nameDelete() {
    return this.formDeleteIncome.get('name');
  }

  get genderDelete() {
    return this.formDeleteIncome.get('gender');
  }

  get rollDelete() {
    return this.formDeleteIncome.get('roll');
  }

  get incomeDelete() {
    return this.formDeleteIncome.get('income');
  }

  getIncomeById(id) {
    this.incomeService.getIncomeById(id).subscribe(income => {
      this.idDelete.setValue(income.id);
      this.nameDelete.setValue(income.name);
      this.genderDelete.setValue(income.gender);
      this.rollDelete.setValue(income.roll);
      this.incomeDelete.setValue(income.income);
    });
  }

  deleteIncome() {
    this.incomeService.deleteIncome(this.id).subscribe(() => {
      alert('xoa thanh cong');
      this.router.navigate(['/incomes']);
    });
  }

}
