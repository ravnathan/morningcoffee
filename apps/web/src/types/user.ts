export interface UserLogin {
  username: string;
  password: string;
}

export interface CashierData {
  username: string;
  fullname: string;
  password: string;
  avatar?: File;
}

export interface CashierList {
  cashiersData: Array<{
    id: string;
    username: string;
    fullname: string;
    password: string;
    role: string;
    avatar: string;
  }>;
}

export interface CashierFetch {
    username: string
    fullname: string
    role: string
    avatar: string
}