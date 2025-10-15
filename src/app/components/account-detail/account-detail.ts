import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { AccountDto } from '../../models/account.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './account-detail.html',
  styleUrls: ['./account-detail.css']
})
export class Account implements OnInit {
  accountNo!: string;
  account?: AccountDto;
  amount = 0;

  // transfer
  toAccountNo = '';
  transferAmount = 0;

  msg=''; err='';

  constructor(private route: ActivatedRoute, private accounts: AccountService) {}

  ngOnInit() {
    //Extracts accountNo from URL → e.g., /account/ACC1759086836326.
    this.accountNo = this.route.snapshot.params['accountNo'];
    this.load();
  }

  load() {
    this.msg=''; this.err='';
    this.accounts.getAccount(this.accountNo).subscribe({
      next: a => this.account = a,
      error: e => this.err = e?.error?.message || 'Load failed'
    });
  }

  deposit() {
    this.msg=''; this.err='';
    this.accounts.deposit(this.accountNo, this.amount).subscribe({
      next: a => { this.account = a; this.msg='Deposited'; },
      error: e => this.err = e?.error?.message || 'Deposit failed'
    });
  }

  withdraw() {
    this.msg=''; this.err='';
    this.accounts.withdraw(this.accountNo, this.amount).subscribe({
      next: a => { this.account = a; this.msg='Withdrawn'; },
      error: e => this.err = e?.error?.message || 'Withdraw failed'
    });
  }

  transfer() {
    this.msg=''; this.err='';
    this.accounts.transfer({ fromAccountNo: this.accountNo, toAccountNo: this.toAccountNo, amount: this.transferAmount })
      .subscribe({
        next: (r:any) => { this.msg = typeof r==='string'? r : 'Transfer success'; this.load(); },
        error: e => this.err = e?.error?.message || 'Transfer failed'
      });
  }
}
