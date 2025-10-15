import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CustomerDto } from '../models/customer.model';
import { AccountDto } from '../models/account.model';
import { TransactionDto } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = `${environment.apiBaseUrl}/api/admin`;
  constructor(private http: HttpClient) {}

  customers() { return this.http.get<CustomerDto[]>(`${this.base}/customers`); }
  accounts() { return this.http.get<AccountDto[]>(`${this.base}/accounts`); }
  transactions() { return this.http.get<TransactionDto[]>(`${this.base}/transactions`); }
}
