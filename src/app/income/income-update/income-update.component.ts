import { Component, OnInit } from '@angular/core';
import {Income} from '../../model/Income';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IncomeService} from '../../service/income.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-income-update',
  templateUrl: './income-update.component.html',
  styleUrls: ['./income-update.component.css']
})
export class IncomeUpdateComponent implements OnInit {
  income: Income = {};
  incomeForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    gender: new FormControl('', [Validators.required]),
    roll: new FormControl('', [Validators.required]),
    income: new FormControl('', [Validators.required]),
  });

  constructor(private incomeService: IncomeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getIncomeById(id);
    });
  }

  ngOnInit() {
  }

  get idUpdate() {
    return this.incomeForm.get('id');
  }

  get nameUpdate() {
    return this.incomeForm.get('name');
  }

  get genderUpdate() {
    return this.incomeForm.get('gender');
  }

  get rollUpdate() {
    return this.incomeForm.get('roll');
  }

  get incomeUpdate() {
    return this.incomeForm.get('income');
  }

  getIncomeById(id) {
    this.incomeService.getIncomeById(id).subscribe(incomeBe => {
      this.income = incomeBe;
      this.idUpdate.setValue(this.income.id);
      this.nameUpdate.setValue(this.income.name);
      this.genderUpdate.setValue(this.income.gender);
      this.rollUpdate.setValue(this.income.roll);
      this.incomeUpdate.setValue((this.income.income));
    });
  }
  updateIncome() {
    this.incomeService.updateIncome(this.income.id, this.incomeForm.value).subscribe(() => {
      alert('sua thanh cong');
      this.router.navigate(['/incomes']);
    });
  }
}
