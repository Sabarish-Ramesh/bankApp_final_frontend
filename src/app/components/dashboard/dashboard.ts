import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { AccountDto, CreateAccountRequest } from '../../models/account.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  createForm: CreateAccountRequest = { initialBalance: 0, accountType: 'SAVINGS' };
  created?: AccountDto;
  lookAccountNo = '';
  looked?: AccountDto;
  msg=''; err='';

  constructor(private accounts: AccountService) {}

  create() {
    this.msg=''; this.err='';
    if (!this.createForm.initialBalance || this.createForm.initialBalance <= 0) {
    this.err = 'Initial balance must be greater than 0';
    return;
  }
    this.accounts.createAccount(this.createForm).subscribe({
      next: acc => { this.created = acc; this.msg='Account created'; },
      error: e => this.err = e?.error?.message || 'Create failed'
    });
  }

  view() {
    this.msg=''; this.err=''; this.looked=undefined;
    if (!this.lookAccountNo) { this.err='Enter account no'; return; }
    this.accounts.getAccount(this.lookAccountNo).subscribe({
      next: a => this.looked = a,
      error: e => this.err = e?.error?.message || 'Not found'
    });
  }
}
