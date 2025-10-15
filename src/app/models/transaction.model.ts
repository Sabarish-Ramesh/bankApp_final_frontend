export interface TransactionDto {
  accountNo: string;
   amount: number; 
   type: string; 
   timestamp: string;
}
export interface TransferRequest {
  fromAccountNo: string; 
  toAccountNo: string; 
  amount: number;
}
