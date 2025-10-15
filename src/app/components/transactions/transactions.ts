import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Page } from '../../models/page.model';
import { TransactionDto } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class Transactions implements OnInit {
  accountNo!: string;
  page?: Page<TransactionDto>;
  p = 0; size = 10; sortBy = 'timestamp';
  type = ''; minAmount?: number; maxAmount?: number; start = ''; end = '';
  showFilters = false;

  constructor(private tx: TransactionService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.accountNo = this.route.snapshot.params['accountNo'];
    if (this.accountNo) this.loadHistory();
  }

  loadHistory() {
    this.tx.history(this.accountNo, this.p, this.size, this.sortBy).subscribe({ next: r => this.page = r });
  }

  search() {
  const formatDateTime = (val?: string) => {
    if (!val) return undefined;
    // add ":00" if seconds missing (so backend LocalDateTime.parse() works)
    return val.includes(':') && val.length === 16 ? val + ':00' : val;
  };

  const params = {
    type: this.type || undefined,
    minAmount: this.minAmount,
    maxAmount: this.maxAmount,
    start: formatDateTime(this.start),
    end: formatDateTime(this.end),
    page: this.p,
    size: this.size,
    sortBy: this.sortBy
  };

  this.tx.search(params).subscribe({
    next: (r) => (this.page = r),
  });
}


  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    this.showFilters = false;
    this.search();
  }
  removeFilters(){
    this.type = '';
  this.minAmount = undefined;
  this.maxAmount = undefined;
  this.start = '';
  this.end = '';
  this.p = 0;
  this.showFilters = false;
  this.loadHistory(); 
  }

  onSortChange() {
    this.p = 0;
    if (this.type || this.minAmount || this.maxAmount || this.start || this.end) {
      this.search();
    } else {
      this.loadHistory();
    }
  }

  prevPage() { if (this.p > 0) { this.p--; this.search(); } }
  nextPage() { if (this.page && this.p < this.page.totalPages - 1) { this.p++; this.search(); } }
}

