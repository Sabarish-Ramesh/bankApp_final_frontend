export interface AccountDto {
  accountNo: string; 
  balance: number;
   accountType: string; 
   customerId: string;
}
export interface CreateAccountRequest {
  initialBalance: number; 
  accountType: string; // SAVINGS | CURRENT
}
