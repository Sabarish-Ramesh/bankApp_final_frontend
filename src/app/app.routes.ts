import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// feature components
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { Account } from './components/account-detail/account-detail';
import { Transactions } from './components/transactions/transactions';
import { Customers as AdminCustomers } from './components/admin/admin-customers/admin-customers';
import { Accounts as AdminAccounts } from './components/admin/admin-accounts/admin-accounts';
import { Transactions as AdminTransactions } from './components/admin/admin-transactions/admin-transactions';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'account/:accountNo', component: Account, canActivate: [AuthGuard] },
  { path: 'transactions/:accountNo', component: Transactions, canActivate: [AuthGuard] },

  { path: 'admin/customers', component: AdminCustomers, canActivate: [AdminGuard] },
  { path: 'admin/accounts', component: AdminAccounts, canActivate: [AdminGuard] },
  { path: 'admin/transactions', component: AdminTransactions, canActivate: [AdminGuard] },

  // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' },
];
