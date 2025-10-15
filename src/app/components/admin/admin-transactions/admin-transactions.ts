import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-transactions.html',
  styleUrls: ['./admin-transactions.css']
})
export class Transactions implements OnInit {
  
  list: any[] = [];
  filteredList: any[] = [];
  sortBy = 'timestamp';
  type = ''; minAmount?: number; maxAmount?: number; start = ''; end = '';
  showFilters = false;
  Math = Math; 

  p = 0; size = 10; // pagination

  constructor(private admin: AdminService) {}

  ngOnInit() {
    this.admin.transactions().subscribe({
      next: (r) => {
        this.list = r as any[];
        this.filteredList = [...this.list];
        this.onSortChange();
      },
    });
  }

  get paginatedList() {
    const start = this.p * this.size;
    return this.filteredList.slice(start, start + this.size);
  }

  toggleFilters() { this.showFilters = !this.showFilters; }

  onSortChange() {
    if (this.sortBy === 'amount') {
      this.filteredList.sort((a, b) => b.amount - a.amount);
    } else {
      this.filteredList.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
  }

  applyFilters() {
    this.showFilters = false;
    const startTime = this.start ? new Date(this.start).getTime() : null;
    const endTime = this.end ? new Date(this.end).getTime() : null;

    this.filteredList = this.list.filter((t) => {
      const matchType = this.type ? t.type.toLowerCase().includes(this.type.toLowerCase()) : true;
      const matchMin = this.minAmount ? t.amount >= this.minAmount : true;
      const matchMax = this.maxAmount ? t.amount <= this.maxAmount : true;
      const txTime = new Date(t.timestamp).getTime();
      const matchStart = startTime ? txTime >= startTime : true;
      const matchEnd = endTime ? txTime <= endTime : true;
      return matchType && matchMin && matchMax && matchStart && matchEnd;
    });
    this.p = 0;
    this.onSortChange();
  }

  removeFilters() {
    this.type = '';
    this.minAmount = undefined;
    this.maxAmount = undefined;
    this.start = '';
    this.end = '';
    this.filteredList = [...this.list];
    this.showFilters = false;
    this.p = 0;
    this.onSortChange();
  }

  prevPage() { if (this.p > 0) this.p--; }
  nextPage() { if ((this.p + 1) * this.size < this.filteredList.length) this.p++; }
}
