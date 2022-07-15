import { Component, OnInit } from '@angular/core';
import {IncomeService} from '../../service/income.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Income} from '../../model/Income';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.component.html',
  styleUrls: ['./income-create.component.css']
})
export class IncomeCreateComponent implements OnInit {
  income: Income = {};
  formCreateIncome: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    gender: new FormControl('', [Validators.required]),
    roll: new FormControl('', [Validators.required]),
    income: new FormControl('', [Validators.required]),
  });

  constructor(private incomeService: IncomeService,
              private router: Router,
              private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  get idCreate() {
    return this.formCreateIncome.get('id');
  }

  get nameCreate() {
    return this.formCreateIncome.get('name');
  }

  get genderCreate() {
    return this.formCreateIncome.get('gender');
  }

  get rollCreate() {
    return this.formCreateIncome.get('roll');
  }

  get incomeCreate() {
    return this.formCreateIncome.get('income');
  }

  createIncome(formCreateIncome) {
    if (formCreateIncome.valid) {
      this.incomeService.createIncome(this.formCreateIncome.value).subscribe(() => {
        alert('thanh cong!');
        this.router.navigate(['/incomes']);
        formCreateIncome.reset();
      }, error => console.log(error));
    } else {
      alert('tao khong thanh cong');
    }
  }
}
