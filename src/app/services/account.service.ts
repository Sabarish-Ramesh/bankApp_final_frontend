import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AccountDto, CreateAccountRequest } from '../models/account.model';
import { TransferRequest } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private base = `${environment.apiBaseUrl}/api/accounts`;
  constructor(private http: HttpClient) {}

  createAccount(req: CreateAccountRequest): Observable<AccountDto> {
    return this.http.post<AccountDto>(this.base, req);
  }
  getAccount(accountNo: string): Observable<AccountDto> {
    return this.http.get<AccountDto>(`${this.base}/${accountNo}`);
  }
  deposit(accountNo: string, amount: number): Observable<AccountDto> {
    return this.http.post<AccountDto>(`${this.base}/${accountNo}/deposit?amount=${amount}`, {});
  }
  withdraw(accountNo: string, amount: number): Observable<AccountDto> {
    return this.http.post<AccountDto>(`${this.base}/${accountNo}/withdraw?amount=${amount}`, {});
  }
  transfer(req: TransferRequest) {
    return this.http.post(`${this.base}/transfer`, req, { responseType: 'text' });
  }
}
