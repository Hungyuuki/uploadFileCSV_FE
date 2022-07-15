import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Income} from '../model/Income';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get<any>(`${API_URL}/incomes`);
  }
  getIncomeById(id): Observable<Income> {
    return this.http.get<Income>(`${API_URL}/incomes/${id}`);

  }
  createIncome(income): Observable<Income> {
    return this.http.post(`${API_URL}/incomes`, income);

  }
  updateIncome(id, income): Observable<Income> {
    return this.http.put(`${API_URL}/incomes/${id}`, income);

  }
  deleteIncome(id): Observable<Income> {
    return this.http.delete<Income>(`${API_URL}/incomes/${id}`);
  }
}
