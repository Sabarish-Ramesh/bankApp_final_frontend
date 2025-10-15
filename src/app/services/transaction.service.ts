import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';
import { TransactionDto } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private base = `${environment.apiBaseUrl}/api/transactions`;
  constructor(private http: HttpClient) {}

  history(accountNo: string, page=0, size=10, sortBy='timestamp'): Observable<Page<TransactionDto>> {
    return this.http.get<Page<TransactionDto>>(`${this.base}/${accountNo}`, { params: { page, size, sortBy } as any });
  }

  search(params: { type?: string; minAmount?: number; maxAmount?: number; start?: string; end?: string; page?: number; size?: number; sortBy?: string; }) {
    let p = new HttpParams();
    Object.entries(params).forEach(([k,v]) => { if (v!==undefined && v!==null && v!=='') p = p.set(k,String(v)); });
    return this.http.get<Page<TransactionDto>>(`${this.base}/search`, { params: p });
  }
}
