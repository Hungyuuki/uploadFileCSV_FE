import { Component, OnInit } from '@angular/core';
import {Income} from '../../model/Income';
import {IncomeService} from '../../service/income.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
incomes: Income[] = [];
  constructor(private incomeService: IncomeService) { }

  getAllIncome() {
    this.incomeService.getAll().subscribe((incomesFromBE) => {
      this.incomes = incomesFromBE;
    }, error => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.getAllIncome();
  }
  // first() {
  //   this.indexPagination = 0;
  //   this.currentPagination = 1;
  //   this.incomeService.getAll(this.indexPagination).subscribe((data) => {
  //     this.incomes = data.content;
  //   });
  // }
  //
  // last() {
  //   this.indexPagination = this.totalPagination - 1;
  //   this.currentPagination = this.totalPagination;
  //   this.incomeService.getAll(this.indexPagination).subscribe((data) => {
  //     this.incomes = data.content;
  //   });
  // }
  //
  // previous() {
  //   this.indexPagination = this.indexPagination - 1;
  //   this.currentPagination = this.currentPagination - 1;
  //   this.incomeService.getAll(this.indexPagination).subscribe((data) => {
  //     this.incomes = data.content;
  //   });
  // }
  //
  // next() {
  //   this.indexPagination = this.indexPagination + 1;
  //   this.currentPagination = this.currentPagination + 1;
  //   this.incomeService.getAll(this.indexPagination).subscribe((data) => {
  //     this.incomes = data.content;
  //   });
  // }
}
