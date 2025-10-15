import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-accounts.html',
  styleUrls: ['./admin-accounts.css']
})
export class Accounts implements OnInit {
  list: any[] = [];
  filteredList: any[] = [];
  searchBy = 'accountNo';
  searchValue = '';

  constructor(private admin: AdminService) {}

  ngOnInit() {
    this.admin.accounts().subscribe({
      next: (r) => {
        this.list = r as any[];
        this.filteredList = [...this.list];
      }
    });
  }

  applySearch() {
    const val = this.searchValue.trim().toLowerCase();
    if (!val) { this.filteredList = [...this.list]; return; }

    this.filteredList = this.list.filter((item) =>
      (item[this.searchBy] + '').toLowerCase().includes(val)
    );
  }

  resetSearch() {
    this.searchValue = '';
    this.filteredList = [...this.list];
  }
}
