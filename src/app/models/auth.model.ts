export interface AuthRequest { 
    username: string; 
    password: string; 
}
export interface AuthResponse { 
    token: string; 
}
export interface TokenPayload { 
    sub: string; //email
    uid: number; //customerId
    role: string; //role
    exp: number; //expiry time
}
