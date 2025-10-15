import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-customers.html',
  styleUrls: ['./admin-customers.css']
})
export class Customers implements OnInit {
  list: any[] = [];
  filteredList: any[] = [];
  searchBy = 'name';
  searchValue = '';

  constructor(private admin: AdminService) {}

  ngOnInit() {
    this.admin.customers().subscribe({
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
