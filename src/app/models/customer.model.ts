export interface CreateCustomerRequest {
  name: string; 
  address: string; 
  phone: string; 
  email: string; 
  password: string;
}
export interface CustomerDto {
  customerId: string; 
  name: string; 
  email: string; 
  phone: string; 
  address: string; 
  role: string;
}
